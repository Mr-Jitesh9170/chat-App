import GalleryIcon from "../Assests/gallery.svg"
import DocumentsIcon from "../Assests/document.svg"
import LocationIcon from "../Assests/location.svg"
import CameraIcon from "../Assests/camera.svg"

// Dashboard Icons =>
import ChatIcon from "../Assests/chatIcons.svg";
import SettingIcon from "../Assests/settingIcons.svg";
import ProfileIcon from "../Assests/profileIcons.svg";
import NotificationIcon from "../Assests/notificationIcons.svg";
import LogoutIcon from "../Assests/logout.svg"


// Edit Profile => 
export const editProfile = [
    {
        name: "profilePhoto",
        accept: "image/*",
        type: "file",
    },
    {
        name: "name",
        placeHolder: "Name...",
        type: "text",
    },
    {
        name: "email",
        placeHolder: "Email...",
        type: "email",
    },
    {
        name: "number",
        placeHolder: "Number...",
        type: "number",
    },
    {
        name: "address",
        placeHolder: "Address...",
        type: "text",
    },
]

// Dashboard Icons =>
export const ICONS = [
    {
        name: "Profile 👥",
        route: "/chit-chat/dashboard/profile",
        icons: ProfileIcon
    },
    {
        name: "Notification 🔔",
        route: "/chit-chat/dashboard/notification",
        icons: NotificationIcon
    },
    {
        name: "Setting ⚙️",
        route: "/chit-chat/dashboard/setting",
        icons: SettingIcon
    },
    {
        icons: LogoutIcon
    }
];



// Notifications data =>
export const dummyNotifications = [
    {
        notification_id: "1",
        title: "New Message",
        body: "You have received a new message from John Doe.",
        timestamp: "2024-04-09T02:56:26.971Z",
        sender: "John Doe",
        type: "message",
        priority: "high",
        profile_photo: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        notification_id: "2",
        title: "New Event Invitation",
        body: "You have been invited to a birthday party.",
        timestamp: "2024-04-09T10:30:00.000Z",
        sender: "Jane Smith",
        type: "event",
        priority: "medium",
        profile_photo: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
    },
    {
        notification_id: "3",
        title: "Reminder",
        body: "Don't forget to submit your assignment by tomorrow.",
        timestamp: "2024-04-08T18:00:00.000Z",
        sender: "University",
        type: "reminder",
        priority: "high",
        profile_photo: "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        notification_id: "4",
        title: "New Connection Request",
        body: "You have a new connection request from Alex Johnson.",
        timestamp: "2024-04-07T15:45:00.000Z",
        sender: "Alex Johnson",
        type: "connection_request",
        priority: "low",
        profile_photo: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        notification_id: "5",
        title: "New Announcement",
        body: "There will be a staff meeting tomorrow at 10 AM.",
        timestamp: "2024-04-06T17:00:00.000Z",
        sender: "HR Department",
        type: "announcement",
        priority: "medium",
        profile_photo: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        notification_id: "6",
        title: "New Task Assigned",
        body: "You have been assigned a new task.",
        timestamp: "2024-04-05T12:00:00.000Z",
        sender: "Manager",
        type: "task",
        priority: "high",
        profile_photo: "https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        notification_id: "7",
        title: "New Comment",
        body: "Your post has received a new comment.",
        timestamp: "2024-04-04T09:30:00.000Z",
        sender: "Commenter",
        type: "comment",
        priority: "medium",
        profile_photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        notification_id: "8",
        title: "New Friend Request",
        body: "You have a new friend request from Sarah Williams.",
        timestamp: "2024-04-03T14:20:00.000Z",
        sender: "Sarah Williams",
        type: "friend_request",
        priority: "low",
        profile_photo: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        notification_id: "9",
        title: "New Project Update",
        body: "An update has been posted regarding Project X.",
        timestamp: "2024-04-02T16:45:00.000Z",
        sender: "Project Team",
        type: "update",
        priority: "medium",
        profile_photo: "https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        notification_id: "10",
        title: "New Invitation",
        body: "You have been invited to a networking event.",
        timestamp: "2024-04-01T11:00:00.000Z",
        sender: "Event Organizer",
        type: "invitation",
        priority: "high",
        profile_photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        notification_id: "11",
        title: "New Announcement",
        body: "The company picnic has been rescheduled.",
        timestamp: "2024-03-31T13:00:00.000Z",
        sender: "HR Department",
        type: "announcement",
        priority: "medium",
        profile_photo: "https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        notification_id: "12",
        title: "New Task Assigned",
        body: "A new task has been assigned to your team.",
        timestamp: "2024-03-30T09:00:00.000Z",
        sender: "Team Lead",
        type: "task",
        priority: "high",
        profile_photo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        notification_id: "13",
        title: "New Message",
        body: "You have received a new message from Emily Brown.",
        timestamp: "2024-03-29T15:30:00.000Z",
        sender: "Emily Brown",
        type: "message",
        priority: "high",
        profile_photo: "https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        notification_id: "14",
        title: "New Announcement",
        body: "There will be a company-wide training session next week.",
        timestamp: "2024-03-28T10:00:00.000Z",
        sender: "Training Department",
        type: "announcement",
        priority: "medium",
        profile_photo: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        notification_id: "15",
        title: "New Comment",
        body: "Your article has received a new comment.",
        timestamp: "2024-03-27T11:45:00.000Z",
        sender: "Reader",
        type: "comment",
        priority: "medium",
        profile_photo: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
];

// Three-dash =>
export let threeDashPopUp = ["Search", "Share", "Starred massage", "Clear chats",]

// Attachments => 
export const AttachementsData = [
    {
        img: GalleryIcon,
        name: "Gallery"
    },
    {
        img: DocumentsIcon,
        name: "Documents"
    },
    {
        img: LocationIcon,
        name: "Location"
    },
    {
        img: CameraIcon,
        name: "Camera"
    },
]

// Chat-user name =>
export let chatUsers = ["Aman Bhai", "Mohit Sir", "Sachin Thapa", "Pushparaj Sir", "Rahul Sir", "Anshul Sir", "Monu", "Saumya Mam", "Prerana Mam", "Anand", "Pragati"]

// Dummy-Chat of two Users =>
export const DummyChats = [
    {
        id: 1,
        sender: "Aman",
        message: "Hey Jitesh, how's it going?",
        timestamp: new Date("2024-03-20T09:30:00Z")
    },
    {
        id: 2,
        sender: "Jitesh",
        message: "Hey Aman, I'm doing well. Thanks for asking!",
        timestamp: new Date("2024-03-20T09:31:00Z")
    },
    {
        id: 3,
        sender: "Aman",
        message: "That's great to hear!",
        timestamp: new Date("2024-03-20T09:32:00Z")
    },
    {
        id: 4,
        sender: "Jitesh",
        message: "Do you have any plans for the weekend?",
        timestamp: new Date("2024-03-20T09:33:00Z")
    },
    {
        id: 5,
        sender: "Aman",
        message: "Not yet. How about you?",
        timestamp: new Date("2024-03-20T09:34:00Z")
    },
    {
        id: 6,
        sender: "Jitesh",
        message: "I'm thinking of going to the movies.",
        timestamp: new Date("2024-03-20T09:35:00Z")
    },
    {
        id: 7,
        sender: "Aman",
        message: "Sounds like a plan!",
        timestamp: new Date("2024-03-20T09:36:00Z")
    },
    {
        id: 8,
        sender: "Jitesh",
        message: "Do you want to join me?",
        timestamp: new Date("2024-03-20T09:37:00Z")
    },
    {
        id: 9,
        sender: "Aman",
        message: "Sure, I'd love to!",
        timestamp: new Date("2024-03-20T09:38:00Z")
    },
    {
        id: 10,
        sender: "Jitesh",
        message: "Great! Let's meet at the theater at 7 PM.",
        timestamp: new Date("2024-03-20T09:39:00Z")
    },
    {
        id: 1,
        sender: "Aman",
        message: "Hey Jitesh, how's it going?",
        timestamp: new Date("2024-03-20T09:30:00Z")
    },
    {
        id: 2,
        sender: "Jitesh",
        message: "Hey Aman, I'm doing well. Thanks for asking!",
        timestamp: new Date("2024-03-20T09:31:00Z")
    },
    {
        id: 3,
        sender: "Aman",
        message: "That's great to hear!",
        timestamp: new Date("2024-03-20T09:32:00Z")
    },
    {
        id: 4,
        sender: "Jitesh",
        message: "Do you have any plans for the weekend?",
        timestamp: new Date("2024-03-20T09:33:00Z")
    },
    {
        id: 5,
        sender: "Aman",
        message: "Not yet. How about you?",
        timestamp: new Date("2024-03-20T09:34:00Z")
    },
    {
        id: 6,
        sender: "Jitesh",
        message: "I'm thinking of going to the movies.",
        timestamp: new Date("2024-03-20T09:35:00Z")
    },
    {
        id: 7,
        sender: "Aman",
        message: "Sounds like a plan!",
        timestamp: new Date("2024-03-20T09:36:00Z")
    },
    {
        id: 8,
        sender: "Jitesh",
        message: "Do you want to join me?",
        timestamp: new Date("2024-03-20T09:37:00Z")
    },
    {
        id: 9,
        sender: "Aman",
        message: "Sure, I'd love to!",
        timestamp: new Date("2024-03-20T09:38:00Z")
    },
    {
        id: 10,
        sender: "Jitesh",
        message: "Great! Let's meet at the theater at 7 PM.",
        timestamp: new Date("2024-03-20T09:39:00Z")
    },
    {
        id: 1,
        sender: "Aman",
        message: "Hey Jitesh, how's it going?",
        timestamp: new Date("2024-03-20T09:30:00Z")
    },
    {
        id: 2,
        sender: "Jitesh",
        message: "Hey Aman, I'm doing well. Thanks for asking!",
        timestamp: new Date("2024-03-20T09:31:00Z")
    },
    {
        id: 3,
        sender: "Aman",
        message: "That's great to hear!",
        timestamp: new Date("2024-03-20T09:32:00Z")
    },
    {
        id: 4,
        sender: "Jitesh",
        message: "Do you have any plans for the weekend?",
        timestamp: new Date("2024-03-20T09:33:00Z")
    },
    {
        id: 5,
        sender: "Aman",
        message: "Not yet. How about you?",
        timestamp: new Date("2024-03-20T09:34:00Z")
    },
    {
        id: 6,
        sender: "Jitesh",
        message: "I'm thinking of going to the movies.",
        timestamp: new Date("2024-03-20T09:35:00Z")
    },
    {
        id: 7,
        sender: "Aman",
        message: "Sounds like a plan!",
        timestamp: new Date("2024-03-20T09:36:00Z")
    },
    {
        id: 8,
        sender: "Jitesh",
        message: "Do you want to join me?",
        timestamp: new Date("2024-03-20T09:37:00Z")
    },
    {
        id: 9,
        sender: "Aman",
        message: "Sure, I'd love to!",
        timestamp: new Date("2024-03-20T09:38:00Z")
    },
    {
        id: 10,
        sender: "Jitesh",
        message: "Great! Let's meet at the theater at 7 PM.",
        timestamp: new Date("2024-03-20T09:39:00Z")
    }

];