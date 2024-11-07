import { gql } from "@apollo/client";

export const GET_ME = gql`
    query MeQuery {
        me {
            id
            username
            firstName
            lastName
            email
            isActive
            isStaff
            isSuperuser
            dateJoined
            lastLogin
        }
    }
`;
