import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ViewListIcon from '@material-ui/icons/ViewList';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import RedeemIcon from '@material-ui/icons/Redeem';

const SideNav = () => {
    return [
        {
            icon: <GroupWorkIcon color="primary" />,
            name: "Genealogy",
            link: "/genealogy",
            side: true
        },
    ]
}

export default SideNav
