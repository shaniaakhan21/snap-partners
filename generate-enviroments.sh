#!/bin/bash


SCRIPT=$(cat <<EOF
$SCRIPT
server {
    listen [::]:443 ssl;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/snap.devopsteam.info/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/snap.devopsteam.info/privkey.pem;
    server_name _;
    return      444;
}
EOF
)

set -e

echo "Clean Enviroments..."
API0=$(curl -H "Authorization: Bearer $GITLAB_API_KEY" "$CI_API_V4_URL/projects/$CI_PROJECT_ID/environments?states=stopped" 2>/dev/null | jq -r '.[] | .id')
for ID in $API0; do
  curl --request DELETE -H "Authorization: Bearer $GITLAB_API_KEY" "$CI_API_V4_URL/projects/$CI_PROJECT_ID/environments/$ID"
done

API1=$(curl -H "Authorization: Bearer $GITLAB_API_KEY" "$CI_API_V4_URL/projects/$CI_PROJECT_ID/repository/branches?search=^feature/&per_page=100" 2>/dev/null | jq -r '.[] | .name')

for NAME in $API1; do
    IFS='/' read -r -a array <<< "$NAME"
    if [[ "${array[2]}" != 'master' ]]; then
      continue
    fi
    SUBDOMAIN=$(echo "${array[1]}" | tr -d -c '[:alnum:]' | cut -c1-30)
    PORT=$(echo $SUBDOMAIN | md5sum | tr -d -c 0-9 | cut -c1-4)
    SCRIPT=$(cat <<EOF
$SCRIPT
server {
    client_max_body_size 100M;
    server_name $SUBDOMAIN.snap.devopsteam.info;
    access_log off;
    error_log off;
    root /home/gitlab-runner/snap-website-$SUBDOMAIN/dist;
    location / {
      proxy_set_header Upgrade \$http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
      proxy_set_header Host \$host;
      proxy_http_version 1.1;
      proxy_pass http://localhost:4$PORT;
    }
    location ~ ^/api/(.+) {
      rewrite ^/api(.*)\$ \$1 break;
      proxy_set_header Upgrade \$http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
      proxy_set_header Host \$host;
      proxy_pass http://localhost:9090;
    }
    listen [::]:443 ssl;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/snap.devopsteam.info/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/snap.devopsteam.info/privkey.pem;
    error_page  405     =200 \$uri;
}
server {
    client_max_body_size 100M;
    server_name $SUBDOMAIN-admin.snap.devopsteam.info;
    access_log off;
    error_log off;
    root /home/gitlab-runner/snap-admin-$SUBDOMAIN/build;
    location ~ ^.+\..+$ {
      try_files $uri =404;
    }
    location / {
      try_files $uri $uri/ /index.html;
    }
    location ~ ^/api/(.+) {
      rewrite ^/api(.*)\$ \$1 break;
      proxy_set_header Upgrade \$http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
      proxy_set_header Host \$host;
      proxy_pass http://localhost:9090;
    }
    listen [::]:443 ssl;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/snap.devopsteam.info/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/snap.devopsteam.info/privkey.pem;
    error_page  405     =200 \$uri;
}
EOF
)


GITLAB=$(cat <<EOF
$GITLAB

$SUBDOMAIN.snap.devopsteam.info:
  stage: deploy
  environment:
    name: stage/$SUBDOMAIN
    url: https://$SUBDOMAIN.snap.devopsteam.info
    on_stop: $SUBDOMAIN.snap.devopsteam.info_stop
  only:
    - $NAME
  tags:
    - snap-runner-3
  script:
    - rm -rf /home/gitlab-runner/snap-website-$SUBDOMAIN-temp
    - mkdir /home/gitlab-runner/snap-website-$SUBDOMAIN-temp
    - cp -r * /home/gitlab-runner/snap-website-$SUBDOMAIN-temp
    # FRONT
    - cd /home/gitlab-runner/snap-website-$SUBDOMAIN-temp
    - (printenv | grep STAGE_FRONT_ | grep -v STAGE_FRONT_PORT | sed -e "s/^STAGE_FRONT_//"  ) > .env
    - printf "\nREACT_APP_SUBDOMAIN=https://$SUBDOMAIN.snap.devopsteam.info" >> .env
    - npm install
    - npm run build
    - rm -rf /home/gitlab-runner/snap-website-$SUBDOMAIN
    - mv /home/gitlab-runner/snap-website-$SUBDOMAIN-temp /home/gitlab-runner/snap-website-$SUBDOMAIN
    - cd /home/gitlab-runner/snap-website-$SUBDOMAIN
    - pm2 delete "next-$SUBDOMAIN" || exit_code=$?
    - PORT=4$PORT pm2 start npm --name "next-$SUBDOMAIN" -- start
    - sudo /usr/bin/systemctl restart nginx
  after_script:
    - rm -rf /home/gitlab-runner/snap-website-$SUBDOMAIN-temp

$SUBDOMAIN.snap.devopsteam.info_stop:
  stage: deploy
  tags:
    - snap-runner-3
  when: manual
  only:
    - $NAME
  variables:
    GIT_STRATEGY: none
  script:
    - cd /home/gitlab-runner/snap-website-$SUBDOMAIN
    - pm2 delete "next-$SUBDOMAIN" || exit_code=$?
    - rm -rf /home/gitlab-runner/snap-website-$SUBDOMAIN
    - sudo /usr/bin/systemctl restart nginx
  environment:
    name: stage/$SUBDOMAIN
    action: stop

EOF
)
done

echo "$SCRIPT" > /etc/nginx/sites-available/enviroments
echo "$GITLAB" > generated-gitlab-ci-stage.yml
