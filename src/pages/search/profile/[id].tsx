/* eslint-disable no-use-before-define */
import IndividualProfile from 'components/page/search/individualProfile/IndividualProfile'
import ProfileSearchForm from 'components/page/search/ProfileSearchForm'
import DashboardLayout from 'layouts/private/Dashboard'
import React from 'react'

function ProfileSearch () {
  return (
    <DashboardLayout>
      <ProfileSearchForm>
        <IndividualProfile />
      </ProfileSearchForm>
    </DashboardLayout>
  )
}

export default ProfileSearch
