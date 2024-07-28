import { USERS } from "./User";

export const POSTS = [
  {
    imageUrl : 'https://i.ibb.co/J3KpVrz/IMG-4195.jpg',
    user : USERS[0].user,
    likes : 99,
    caption : 'Train Ride to Hogwarts. 🤠',
    profile_picture: USERS[0].image,
    comments : [
        {
            user : 'krishna',
            comment : 'Wow! This builds looks like fire. Super excited about this 🚀🚀 ',
        },

        {
            user : 'ram',
            comment : "Once I wake up, I'll finally be ready to code this up !",
        },

    ],
},
   {
    imageUrl : 'https://i.ibb.co/xsMhw55/IMG-5661.jpg',
    user : USERS[1].user,
    likes : 99,
    caption : 'Train Ride to Hogwarts. 🤠',
    profile_picture: USERS[1].image,
    comments : [
        {
            user : 'krishna',
            comment : 'Wow! This builds looks like fire. Super excited about this 🚀🚀 '
        },

        {
            user : 'ram',
            comment : "Once I wake up, I'll finally be ready to code this up !"
        },

    ],
},
]