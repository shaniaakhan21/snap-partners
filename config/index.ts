interface IConfig {
  HTTP: {
    STATUS_CODE: {
      SUCCESSFUL: 200,
      METHOD_NOT_ALLOWED: 405,
      INCORRECT_CREDENTIALS: 401,
      USER_NOT_FOUND: 404,
      FIELDS_REQUIRED: 400,
      CONFLICT_TO_CREATE_USER: 409,
    },
    METHODS: {
      POST: 'POST',
      UPDATE: 'UPDATE',
      GET: 'GET',
      DELETE: 'DELETE'
    }
  },

  PAGE_INFO: {
    SEO: {
      AUTHOR: string
      TITLE_PAGE: string
      DESCRIPTION_PAGE: string
      URL_PAGE: string
      KEYWORDS_PAGE: string[]
    },
    RRSS: {
      TWITTER: {
        USERNAME: string
        URL: string
      }
    }
  }
}

export const config: IConfig = {
  HTTP: {
    STATUS_CODE: {
      SUCCESSFUL: 200,
      METHOD_NOT_ALLOWED: 405,
      INCORRECT_CREDENTIALS: 401,
      USER_NOT_FOUND: 404,
      FIELDS_REQUIRED: 400,
      CONFLICT_TO_CREATE_USER: 409
    },
    METHODS: {
      POST: 'POST',
      UPDATE: 'UPDATE',
      GET: 'GET',
      DELETE: 'DELETE'
    }
  },

  PAGE_INFO: {
    SEO: {
      AUTHOR: 'Snap Deliver',
      TITLE_PAGE: 'Snap Deliver',
      DESCRIPTION_PAGE: 'Snap Deliver Application',
      URL_PAGE: 'https://snapdeliver.com',
      KEYWORDS_PAGE: [
        'Snap Deliver',
        'Snap Deliver App'
      ]
    },
    RRSS: {
      TWITTER: {
        USERNAME: '@SnapDeliver',
        URL: ''
      }
    }
  }
}
