/*
 * * Â© Copyright 2017-2020 IBD Tecnologies Private Limited.
 * *                       3/506 Kannadhsan Street ,ShanmugaNagar,Porur
 * *                       Chennai - 600125.
 * *                       India
 * *
 * * This source is part of the General Framework and is copyrighted by
 * * IBD Technologies Private Limited.
 * *
 * * All rights reserved.  No part of this work may be reproduced, stored in a
 * * retrieval system, adopted or transmitted in any form or by any means,
 * * electronic, mechanical, photographic, graphic, optic recording or otherwise,
 * * translated in any language or computer language, without the prior written
 * * permission of IBD Technologies Private Limited.
 /**/
/**/
/**/
/* * * Change Tag:3.0 UI/UX
Change Desc:  Mobile :-  change case for create default
Changed By : Shashank
Date:10-10-2021 
*/





class DrawerListUtils { }





DrawerListUtils.AdminDraweList = [
    {
        id: 1,
        name: 'Configurations',
        subCat: [
            {
                subCatName: 'Institute General Configuration',
                subCat: [
                    {
                        subCatName: 'Institute Logo',
                    },
                    {
                        subCatName: 'Subjects',
                    },
                    {
                        subCatName: 'Fee Types',
                    },
                    {
                        subCatName: 'Others',
                    },
                ]
            },
            {
                subCatName: 'Auto Approval Configuration',
            },
            {
                subCatName: 'Academic Year',
            },
            {
                subCatName: 'Institute Calendar',
            },
            {
                subCatName: 'Assignee Group',
            },
            {
                subCatName: 'Staff Profiles',
            },
            {
                subCatName: 'Student Profiles',
            },
            {
                subCatName: 'Class',
            },

            {
                subCatName: 'Timetable',
            },
            {
                subCatName: 'Student Register',
            }

        ],
        icon: require("../asssets/icons/configuration.png"),
    },
    {
        id: 2,
        name: 'Classroom Activities',
        subCat: [
            {
                subCatName: 'Attendance',
            },
            {
                subCatName: 'Exam Configuration',
            },
            {
                subCatName: 'Diary planner',
            },
            {
                subCatName: 'Parent Signature Tracking',
                subCat: [
                    {
                        subCatName: 'Progress Card',
                    },
                    {
                        subCatName: 'Soft Skills',
                    },
                ]
            },



        ],
        icon: require("../asssets/icons/classroom.png"),
    },
    {
        id: 3,
        name: 'Assessments & Insights',
       //name :'Assesments',
        subCat: [
            {
                subCatName: 'Exam Assessment',
            },
            {
                subCatName: 'Soft Skill Assessment',
            },
            {
                subCatName: 'Assignment Assessment',
            },
            {
                subCatName: 'Exam Insights',
                subCat: [
                    {
                        subCatName: 'Class',
                    },
                    {
                        subCatName: 'Student',
                    },
                    {
                        subCatName: 'Institute',
                    },
                ]
            },

        ],
        icon: require("../asssets/icons/assesment.png"),
    },
    {
        id: 4,
        name: 'Learning Management System',
        subCat: [
            {
                subCatName: 'Video Lesson',
            },
            {
                subCatName: 'Study Material',
            },
            {
                subCatName: 'Assignment',
            },
            {
                subCatName: 'Notes',
                subCat: [
                    {
                        subCatName: 'Staff',
                    },
                    {
                        subCatName: 'Student',
                    },
                ]
            },
            {
                subCatName: 'Lesson Planner',
                subCat: [
                    {
                        subCatName: 'Staff',
                    },
                    {
                        subCatName: 'Student',
                    },
                ]
            },
           /* {
                subCatName: 'Knowledge Sharing Blogs',
            },*/

        ],
        icon: require("../asssets/icons/learning.png"),
    },
    {
        id: 5,
        name: 'Online Video Rooms',
        subCat: [
            {
                subCatName: 'Online Video Classrooms',
            },
            {
                subCatName: 'Online Staff Meetings',
            },
            {
                subCatName: 'Online Parent/Student Meetings',
            },
            {
                subCatName: 'View Meeting Attendance',
            },
        ],
        icon: require("../asssets/icons/video-lesson.png"),
    },
    /*{
        id: 6,
        name: 'Online Test Tool',
        subCat: [
            {
                subCatName: 'Question Paper Configuration',
            },
            {
                subCatName: 'Test Schedule Configuration',
            },
            {
                subCatName: 'Class Exam Insights',
            },

        ],
        icon: require("../asssets/icons/video-lesson.png"),
    },*/
    {
        id: 7,
        name: 'Activities/Events',
        subCat: [
            {
                subCatName: 'Activities/Events Planner',
            },
            {
                subCatName: 'Enroll Status Tracking',
            },
        ],
        icon: require("../asssets/icons/red-carpet.png"),
    },
    {
        id: 8,
        name: 'Fee Management',
        subCat: [
            {
                subCatName: 'Fee Configuration',
            },
            {
                subCatName: 'Fee Payment',
            },

        ],
        icon: require("../asssets/icons/menufees.png"),
    },
    {
        id: 9,
        name: 'Notifications',
        subCat: [
            {
                subCatName: 'Template Configuration',
            },

            {
                subCatName: 'Instant Notification',
            },
        ],
        icon: require("../asssets/icons/notification.png"),
    },
    {
        id: 10,
        name: 'eCircular',
        subCat: [

            {
                subCatName: 'Staff Circulars',
            },
            {
                subCatName: 'Student Circulars',
            },
        ],
        icon: require("../asssets/icons/circular.png"),
    },
    {
        id: 11,
        name: 'Leave Management',
        subCat: [
            {
                subCatName: 'Staff Leaves',
            },

            {
                subCatName: 'Student Leaves',
            },
        ],
        icon: require("../asssets/icons/leave.png"),
    },
    {
        id: 12,
        name: 'Staff Actions',
        subCat: [
            {
                subCatName: 'Timetable',
            },
            // {
            //     subCatName: 'Lesson Planner',
            // },
            // {
            //     subCatName: 'Notes',
            // },
        ],
        icon: require("../asssets/icons/teacher.png"),
    },
    {
        id: 13,
        name: 'Report',
        subCat: [
            {
                subCatName: 'Student',
            },
            {
                subCatName: 'Staff',
            },
            {
                subCatName: 'Class',
            },
            {
                subCatName: 'Institute Exam Performance',
            },
            {
                subCatName: 'Staff Substitute',
            },
            {
                subCatName: 'Student Register',
            },
            {
                subCatName: 'Fees',
            },
            {
                subCatName: 'Payments',
            },
            {
                subCatName: 'Notifications',
            },
            {
                subCatName: 'Teacher Lesson Planner',
            },
            {
                subCatName: 'Student Lesson Planner',
            },
            {
                subCatName: 'Class Lesson Planner',
            },
            {
                subCatName: 'Monthly Attendance',
            },
            {
                subCatName: 'Mark Register',
            },



        ],
        icon: require("../asssets/icons/growth.png"),
    },




    {
        id: 14,
        name: 'Student Level Tracking',
        subCat: [

            {
                subCatName: 'Timetable',
            },
            {
                subCatName: 'Attendance',
            },
            {
                subCatName: 'Video Lesson',
            },
            {
                subCatName: 'Exam Schedule',
            },
           /* {
                subCatName: 'Online Exam Schedule',
            },
            {
                subCatName: 'Exam Insights',
            },*/
            {
                subCatName: 'E-Circular',
            },
            {
                subCatName: 'Progress Card',
            },
            {
                subCatName: 'Soft Skills',
            },
            {
                subCatName: 'Lesson Planner',
            },
            {
                subCatName: 'Study Material',
            },
            {
                subCatName: 'Student Notes',
            },

            {
                subCatName: 'Assignment',
            },

            {
                subCatName: 'Extra Curricular Activity',
            },
            {
                subCatName: 'Notifications',
            },
            {
                subCatName: 'Fee',
            },
            {
                subCatName: 'Payment Receipt',
            },
        ],
        icon: require("../asssets/icons/student.png"),
    },
    {
        id: 15,
        name: 'User Management',
        subCat: [
            {
                subCatName: 'Profile',
            },
            {
                subCatName: 'Role',
            },
        ],
        icon: require("../asssets/icons/grp.png"),
    },



]


DrawerListUtils.TeacherDraweList = [
    {
        id: 1,
        name: 'Configurations',
        subCat: [
            {
                subCatName: 'Staff Profiles',
            },
            {
                subCatName: 'Student Profiles',
            },
            {
                subCatName: 'Class',
            },
            {
                subCatName: 'Timetable',
            },
            {
                subCatName: 'Student Register',
            }

        ],
        icon: require("../asssets/icons/configuration.png"),
    },
    {
        id: 2,
        name: 'Academic Calendar',
        subCat: [
            {
                subCatName: 'Institute Holidays',
            },

        ],
        icon: require("../asssets/icons/placard.png"),
    },
    {
        id: 3,
        name: 'Classroom Activities',
        subCat: [
            {
                subCatName: 'Attendance',
            },
            // {
            //     subCatName: 'Assignment',
            // },
            // {
            //     subCatName: 'Assignment Assessment',
            // },
            {
                subCatName: 'Exam Configuration',
            },
            {
                subCatName: 'Diary planner',
            },
            {
                subCatName: 'Parent Signature Tracking',
                subCat: [
                    {
                        subCatName: 'Progress Card',
                    },
                    {
                        subCatName: 'Soft Skills',
                    },
                ]
            },
            // {
            //     subCatName: 'Soft Skill Assessment',
            // },
            // {
            //     subCatName: 'Video Lesson',
            // },
            // {
            //     subCatName: 'Study Material',
            // },

        ],
        icon: require("../asssets/icons/classroom.png"),
    },
    {
        id: 4,
        name: 'Assessments & Insights',
        //name: 'Assessments',
        subCat: [
            {
                subCatName: 'Exam Assessment',
            },
            {
                subCatName: 'Soft Skill Assessment',
            },
            {
                subCatName: 'Assignment Assessment',
            },
            {
                subCatName: 'Exam Insights',
                subCat: [
                    {
                        subCatName: 'Class',
                    },
                    {
                        subCatName: 'Student',
                    },
                    {
                        subCatName: 'Institute',
                    },
                ]
            },

        ],
        icon: require("../asssets/icons/assesment.png"),
    },
    {
        id: 5,
        name: 'Learning Management System',
        subCat: [
            {
                subCatName: 'Video Lesson',
            },
            {
                subCatName: 'Study Material',
            },
            {
                subCatName: 'Assignment',
            },
            {
                subCatName: 'Notes',
                subCat: [
                    {
                        subCatName: 'Staff',
                    },
                    {
                        subCatName: 'Student',
                    },
                ]
            },
            {
                subCatName: 'Lesson Planner',
                subCat: [
                    {
                        subCatName: 'Staff',
                    },
                    {
                        subCatName: 'Student',
                    },
                ]
            },
           /* {
                subCatName: 'Knowledge Sharing Blogs',
            },*/

        ],
        icon: require("../asssets/icons/learning.png"),
    },
    {
        id: 6,
        name: 'Online Video Rooms',
        subCat: [
            {
                subCatName: 'Online Video Classrooms',
            },
            {
                subCatName: 'Online Staff Meetings',
            },
            {
                subCatName: 'Online Parent/Student Meetings',
            },
            {
                subCatName: 'View Meeting Attendance',
            },
        ],
        icon: require("../asssets/icons/video-lesson.png"),
    },
    {
        id: 7,
        name: 'Activities/Events',
        subCat: [{
            subCatName: 'Activities/Events Planner',
        }],
        icon: require("../asssets/icons/red-carpet.png"),
    },
    {
        id: 8,
        name: 'Instant Notification',
        subCat: [{
            subCatName: 'Instant Notification',
        }],
        icon: require("../asssets/icons/placard.png"),
    },
    {
        id: 9,
        name: 'eCircular',
        subCat: [
            {
                subCatName: 'Staff Circulars',
            },
            {
                subCatName: 'Student Circulars',
            },
        ],
        icon: require("../asssets/icons/circular.png"),
    },
    {
        id: 10,
        name: 'Leave Management',
        subCat: [
            {
                subCatName: 'Staff Leaves',
            },

            {
                subCatName: 'Student Leaves',
            },
        ],
        icon: require("../asssets/icons/leave.png"),
    },

    {
        id: 11,
        name: 'Staff Actions',
        subCat: [
            {
                subCatName: 'Timetable',
            },

        ],
        icon: require("../asssets/icons/teacher.png"),
    },


    {
        id: 12,
        name: 'Report',
        subCat: [
            {
                subCatName: 'Student',
            },
            {
                subCatName: 'Staff',
            },
            {
                subCatName: 'Class',
            },
            {
                subCatName: 'Student Register',
            },
            {
                subCatName: 'Teacher Lesson Planner',
            },
            {
                subCatName: 'Student Lesson Planner',
            },
            {
                subCatName: 'Class Lesson Planner',
            },
            {
                subCatName: 'Monthly Attendance',
            },
            {
                subCatName: 'Mark Register',
            },

        ],
        icon: require("../asssets/icons/growth.png"),
    },
    {
        id: 13,
        name: 'Student Level Tracking',
        subCat: [

            {
                subCatName: 'Timetable',
            },
            {
                subCatName: 'Attendance',
            },
            {
                subCatName: 'Video Lesson',
            },
            {
                subCatName: 'Exam Schedule',
            },
            {
                subCatName: 'Progress Card',
            },
            {
                subCatName: 'Soft Skills',
            },
            {
                subCatName: 'Lesson Planner',
            },
            {
                subCatName: 'Study Material',
            },

            {
                subCatName: 'Student Notes',
            },

            {
                subCatName: 'Assignment',
            },

            {
                subCatName: 'Extra Curricular Activity',
            },
            {
                subCatName: 'Notifications',
            },
            {
                subCatName: 'Fee',
            },
            {
                subCatName: 'Payment Receipt',
            },
        ],
        icon: require("../asssets/icons/student.png"),
    },
]



DrawerListUtils.StaffDraweList = [
    {
        id: 1,
        name: 'Configurations',
        subCat: [
            
                {
                    subCatName: 'Institute General Configuration',
                    subCat: [
                        {
                            subCatName: 'Institute Logo',
                        },
                        {
                            subCatName: 'Subjects',
                        },
                        {
                            subCatName: 'Fee Types',
                        },
                        {
                            subCatName: 'Others',
                        },
                    ]
                },
            {
                subCatName: 'Academic Year',
            },
            {
                subCatName: 'Institute Calendar',
            },
            {
                subCatName: 'Assignee Group',
            },
            {
                subCatName: 'Staff Profiles',
            },
            {
                subCatName: 'Student Profiles',
            },
            {
                subCatName: 'Class',
            },
        ],
        icon: require("../asssets/icons/configuration.png"),
    },
    {
        id: 2,
        name: 'Online Video Rooms',
        subCat: [
            {
                subCatName: 'Online Staff Meetings',
            },
            {
                subCatName: 'View Meeting Attendance',
            },
        ],
        icon: require("../asssets/icons/video-lesson.png"),
    },
    {
        id: 3,
        name: 'Activities/Events',
        subCat: [{
            subCatName: 'Activities/Events Planner',
        }],
        icon: require("../asssets/icons/red-carpet.png"),
    },
    {
        id: 4,
        name: 'Fee Management',
        subCat: [
            {
                subCatName: 'Fee Configuration',
            },
            {
                subCatName: 'Fee Payment',
            },

        ],
        icon: require("../asssets/icons/menufees.png"),
    },
    {
        id: 5,
        name: 'Notifications',
        subCat: [
            {
                subCatName: 'Template Configuration',
            },

            {
                subCatName: 'Instant Notification',
            },
        ],
        icon: require("../asssets/icons/notification.png"),
    },
    {
        id: 6,
        name: 'eCircular',
        subCat: [
            {
                subCatName: 'Staff Circulars',
            },
            {
                subCatName: 'Student Circulars',
            },
        ],
        icon: require("../asssets/icons/circular.png"),
    },
    {
        id: 7,
        name: 'Staff Leaves',
        subCat: [{
            subCatName: 'Staff Leaves',
        },],
        icon: require("../asssets/icons/placard.png"),
    },
    {
        id: 8,
        name: 'Report',
        subCat: [

            {
                subCatName: 'Student Register',
            },
            {
                subCatName: 'Fees',
            },
            {
                subCatName: 'Payments',
            },

        ],
        icon: require("../asssets/icons/growth.png"),
    },
    {
        id: 9,
        name: 'Student Level Tracking',
        subCat: [

            {
                subCatName: 'Notifications',
            },
            {
                subCatName: 'Fee',
            },
            {
                subCatName: 'Payment Receipt',
            },

        ],
        icon: require("../asssets/icons/student.png"),
    },
    {
        id: 10,
        name: 'User Management',
        subCat: [
            {
                subCatName: 'Profile',
            },
        ],
        icon: require("../asssets/icons/placard.png"),
    },

]

DrawerListUtils.ParentDraweList = [
    {
        id: 1,
        name: 'General',
        subCat: [
            {
                subCatName: 'Student Profile',
            },
            {
                subCatName: 'Notifications',
            },
            {
                subCatName: 'eCircular',
            },
            {
                subCatName: 'Institute Holidays',
            },

        ],
        icon: require("../asssets/icons/student.png"),
    },
    {
        id: 2,
        name: 'Academic',
        subCat: [
            {
                subCatName: 'Timetable',
            },
            {
                subCatName: 'Attendance',
            },
            {
                subCatName: 'Leave Management',
            },

            {
                subCatName: 'Extra Curricular Activity',
            },
        ],
        icon: require("../asssets/icons/academic.png"),
    },
    {
        id: 3,
        name: 'Learning Management System',
        subCat: [
            {
                subCatName: 'Lesson Planner',
            },
            {
                subCatName: 'Study Material',
            },

            {
                subCatName: 'Notes',
            },

            /*{
                subCatName: 'Knowledge Sharing Blogs',
            },*/
            {
                subCatName: 'Assignment',
            },

            {
                subCatName: 'Video Lesson',
            },
        ],
        icon: require("../asssets/icons/learning.png"),
    },
    {
        id: 4,
        name: 'Online Video Rooms',
        subCat: [
            {
                subCatName: 'Online Video Classrooms',
            },
            {
                subCatName: 'Online Parent/Student Meetings',
            },
            {
                subCatName: 'View Meeting Attendance',
            },

        ],
        icon: require("../asssets/icons/video-lesson.png"),
    },
    /*{
        id: 5,
        name: 'Online Test',
        subCat: [
            {
                subCatName: 'Test Schedules',
            },
            {
                subCatName: 'Appear for Test',
            },
            {
                subCatName: 'Exam Insights',
            },

        ],
        icon: require("../asssets/icons/examicon.png"),
    },*/
    {
        id: 6,
        name: 'Exam',
        subCat: [
            {
                subCatName: 'Exam Schedule',
            },
            {
                subCatName: 'Progress Card',
            },
            {
                subCatName: 'Soft Skill Assessment',
            },
            {
                subCatName: 'Exam Insights',
            },

        ],
        icon: require("../asssets/icons/examicon.png"),
    },
    {
        id: 7,
        name: 'Fees',
        subCat: [
            {
                subCatName: 'Fee',
            },
            {
                subCatName: 'Payment Receipt',
            },
        ],
        icon: require("../asssets/icons/fees.png"),
    },


    {
        id: 8,
        name: 'Report',
        subCat: [
            {
                subCatName: 'Student',
            },
            {
                subCatName: 'Student Lesson Planner',
            },

        ],
        icon: require("../asssets/icons/growth.png"),
    },

]




DrawerListUtils.AdminSelected = async function (item, index, subIndex, stateObject) {
    switch (index) {
        case 0:
            switch (item) {
                case 'Institute General Configuration':
                    switch (subIndex) {
                        case 0:
                            stateObject.props.navigation.navigate("InstituteLogoConfig")
                            break
                        case 1:
                            stateObject.props.navigation.navigate("InstituteSubjectConfig")
                            break
                        case 2:
                            stateObject.props.navigation.navigate("InstituteFeeConfig")
                            break
                        case 3:
                            stateObject.props.navigation.navigate("InstituteOthersConfig")
                            break
                    }
                    break
                case 'Auto Approval Configuration':
                    stateObject.props.navigation.navigate("InstituteAutoApproval")
                    break
                case 'Academic Year':
                    stateObject.props.navigation.navigate("InstituteYearConfiguration")
                    break
                case 'Institute Calendar':
                    stateObject.props.navigation.navigate("InstituteHoliday")
                    break
                case 'Assignee Group':
                    stateObject.props.navigation.navigate("InstituteGroup")
                    break
                case 'Staff Profiles':
                    stateObject.props.navigation.navigate("TeacherProfile")
                    break
                case 'Student Profiles':
                    stateObject.props.navigation.navigate("StudentProfile")
                    break
                case 'Class':
                    stateObject.props.navigation.navigate("InstituteClassConfig")
                    break
                case 'Timetable':
                    stateObject.props.navigation.navigate("ClassTimeTable")
                    break
                case 'Student Register':
                    stateObject.props.navigation.navigate("ClassStudentRegister")
                    break
            }
            break
        case 1:
            switch (item) {
                case 'Attendance':
                    stateObject.props.navigation.navigate("ClassAttendance")
                    break
                // case 'Assignment':
                //     stateObject.props.navigation.navigate("ClassAssignment")
                //     break
                // case 'Assignment Assessment':
                //     stateObject.props.navigation.navigate("ClassAssessment")
                //     break
                case 'Exam Configuration':
                    stateObject.props.navigation.navigate("ClassExamSchedule")
                    break
                // case 'Exam Assesment':
                //     stateObject.props.navigation.navigate("ClassExamAssessment")
                //     break
                case 'Diary planner':
                    stateObject.props.navigation.navigate("DiaryPlanner")
                    break
                // case 'Soft Skill Assessment':
                //     stateObject.props.navigation.navigate("ClassSoftSkillAssessment")
                //     break
                // case 'Video Lesson':
                //     stateObject.props.navigation.navigate("VideoAssignment")
                //     break
                // case 'Study Material':
                //     stateObject.props.navigation.navigate("StudyMaterial")
                //     break
                case 'Parent Signature Tracking':
                    switch (subIndex) {
                        case 0:
                            stateObject.props.navigation.navigate("ClassProgressCard")
                            break
                        case 1:
                            stateObject.props.navigation.navigate("ClassSoftSkill")
                            break
                    }
                    break
                    break

            }
            break

        case 2:
            switch (item) {
                case 'Exam Assessment':
                    stateObject.props.navigation.navigate("ClassExamAssessment")
                    break
                case 'Soft Skill Assessment':
                    stateObject.props.navigation.navigate("ClassSoftSkillAssessment")
                    break
                case 'Assignment Assessment':
                    stateObject.props.navigation.navigate("ClassAssessment")
                    break
                case 'Exam Insights':
                    switch (subIndex) {
                        case 0:
                            stateObject.props.navigation.navigate("ClassProgressCard")
                            break
                        case 1:
                            stateObject.props.navigation.navigate("ClassSoftSkill")
                            break
                        case 2:
                            stateObject.props.navigation.navigate("ClassSoftSkill")
                            break
                    }
                    break
            }
            break
        case 3:
            switch (item) {
                case 'Video Lesson':
                    stateObject.props.navigation.navigate("VideoAssignment")
                    break
                case 'Study Material':
                    stateObject.props.navigation.navigate("StudyMaterial")
                    break
                case 'Assignment':
                    stateObject.props.navigation.navigate("ClassAssignment")
                    break
                case 'Notes':
                    switch (subIndex) {
                        case 0:
                            stateObject.props.navigation.navigate("TeacherNotes")
                            break
                        case 1:
                            stateObject.props.navigation.navigate("StudentNotes")
                            break

                    }
                    break
                case 'Lesson Planner':
                    switch (subIndex) {
                        case 0:
                            stateObject.props.navigation.navigate("TeacherLessonPlanner")
                            break
                        case 1:
                            stateObject.props.navigation.navigate("StudentLessonPlanner")
                            break

                    }
                    break
                case 'Knowledge Sharing Blogs':
                    // stateObject.props.navigation.navigate("ClassAssignment")
                    break
            }
            break
        case 4:
            switch (item) {
                case 'Online Video Classrooms':
                    stateObject.props.navigation.navigate("OnlineVideoClassRoom")
                    break
                case 'Online Staff Meetings':
                    stateObject.props.navigation.navigate("OnlineStaffMeeting")
                    break
                case 'Online Parent/Student Meetings':
                    stateObject.props.navigation.navigate("OnlineParentMeeting")
                    break
                case 'View Meeting Attendance':
                    // Actions.ViewMeetingAttendance()
                    stateObject.props.navigation.navigate("ViewMeetingAttendance")
                    break

            }
            break
        /*case 5:
            switch (item) {
                case 'Question Paper Configuration':
                    stateObject.props.navigation.navigate("QuestionPaperConfig")
                    break
                case 'Test Schedule Configuration':
                    // stateObject.props.navigation.navigate("OnlineStaffMeeting")
                    break
                case 'Class Exam Insights':
                    // stateObject.props.navigation.navigate("OnlineParentMeeting")
                    break

            }
            break*/
        case 5:
            switch (item) {
                case 'Activities/Events Planner':
                    stateObject.props.navigation.navigate("InstituteActivityEvent")
                    break
                case 'Enroll Status Tracking':
                    stateObject.props.navigation.navigate("ClassCurricularActivity")
                    break

            }
            break

        case 6:
            switch (item) {
                case 'Fee Configuration':
                    stateObject.props.navigation.navigate("InstituteFeeManagement")
                    break
                case 'Fee Payment':
                    stateObject.props.navigation.navigate("InstituteFeePayment")
                    break
            }
            break
        case 7:
            switch (item) {
                case 'Template Configuration':
                    stateObject.props.navigation.navigate("InstituteNotificationTemplate")
                    break
                case 'Instant Notification':
                    stateObject.props.navigation.navigate("InstituteInstantNotification")
                    break

            }
            break
        case 8:
            switch (item) {
                case 'Staff Circulars':
                    stateObject.props.navigation.navigate("TeacherEcircular")
                    break
                case 'Student Circulars':
                    stateObject.props.navigation.navigate("StudentEcircular")
                    break
            }
            break
        case 9:
            switch (item) {
                case 'Staff Leaves':
                    stateObject.props.navigation.navigate("TeacherLeaveManagement")
                    break
                case 'Student Leaves':
                    stateObject.props.navigation.navigate("StudentLeaveManagement")
                    break
            }
            break
        case 10:
            switch (item) {
                case 'Timetable':
                    stateObject.props.navigation.navigate("TeacherTimeTable")
                    break
                // case 'Lesson Planner':
                //     stateObject.props.navigation.navigate("TeacherLessonPlanner")
                //     break
                // case 'Notes':
                //     stateObject.props.navigation.navigate("TeacherNotes")
                //     break
            }
            break





        // case 9:
        //     switch (item) {
        //         case 'Knowledge Sharing Blogs':
        //             // Actions.InstituteBlog()
        //             break                         
        //     }
        //     break
        case 11:
            switch (item) {
                case 'Student':
                    stateObject.props.navigation.navigate("StudentReport")
                    break
                case 'Staff':
                    stateObject.props.navigation.navigate("TeacherReport")
                    break
                case 'Class':
                    stateObject.props.navigation.navigate("ClassReport")
                    break
                case 'Institute Exam Performance':
                    stateObject.props.navigation.navigate("InstituteReport")
                    break
                case 'Staff Substitute':
                    stateObject.props.navigation.navigate("TeacherSubstituteReport")
                    break
                case 'Student Register':
                    stateObject.props.navigation.navigate("StudentRegisterReport")
                    break
                case 'Fees':
                    stateObject.props.navigation.navigate("FeesReport")
                    break
                case 'Payments':
                    stateObject.props.navigation.navigate("PaymentReport")
                    break
                case 'Notifications':
                    stateObject.props.navigation.navigate("NotificationReport")
                    break
                case 'Teacher Lesson Planner':
                    stateObject.props.navigation.navigate("TeacherLessonPlannerReport")
                    break
                case 'Student Lesson Planner':
                    stateObject.props.navigation.navigate("StudentLessonPlannerReport")
                    break
                case 'Class Lesson Planner':
                    stateObject.props.navigation.navigate("ClassLessonPlannerReport")
                    break
                case 'Monthly Attendance':
                    stateObject.props.navigation.navigate("MonthlyAttendanceReport")
                    break
                case 'Mark Register':
                    stateObject.props.navigation.navigate("MarkRegisterReport")
                    break
            }
            break
        case 12:
            switch (item) {
                case 'Timetable':
                    stateObject.props.navigation.navigate("StudentTimeTable")
                    break
                case 'Attendance':
                    stateObject.props.navigation.navigate("StudentAttendance")
                    break
                case 'Video Lesson':
                    stateObject.props.navigation.navigate("StudentVideoAssignment")
                    break
                case 'Exam Schedule':
                    stateObject.props.navigation.navigate("StudentExamSchedule")
                    break
                case 'Online Exam Schedule':
                    // stateObject.props.navigation.navigate("StudentExamSchedule")
                    break
                case 'Exam Insights':
                    //stateObject.props.navigation.navigate("StudentExamSchedule")
                    break
                case 'E-Circular':
                    stateObject.props.navigation.navigate("StudentLevelEcircular")
                    break
                case 'Progress Card':
                    stateObject.props.navigation.navigate("StudentProgressCard")
                    break
                case 'Soft Skills':
                    stateObject.props.navigation.navigate("StudentSoftSkill")
                    break
                case 'Lesson Planner':
                    stateObject.props.navigation.navigate("StudentLessonPlanner")
                    break
                case 'Study Material':
                    stateObject.props.navigation.navigate("StudentStudyMaterial")
                    break
                case 'Student Notes':

                    stateObject.props.navigation.navigate("StudentNotes")
                    break
                case 'Assignment':
                    // Actions.StudentAssignment()
                    stateObject.props.navigation.navigate("StudentAssignment")
                    break
                case 'Extra Curricular Activity':
                    stateObject.props.navigation.navigate("StudentCurricularActivity")
                    break
                case 'Notifications':
                    stateObject.props.navigation.navigate("StudentNotification")
                    break
                case 'Fee':
                    stateObject.props.navigation.navigate("StudentFee")
                    break
                case 'Payment Receipt':
                    stateObject.props.navigation.navigate("StudentPaymentReceipt")
                    break


            }

            break
        case 13:
            switch (item) {
                case 'Profile':
                    stateObject.props.navigation.navigate("UserProfile")
                    break
                case 'Role':
                    stateObject.props.navigation.navigate("UserRole")
                    break
            }
            break



    }
}



DrawerListUtils.StaffSelected = async function (item, index, subIndex, stateObject) {
    switch (index) {
        case 0:
            switch (item) {
                case 'Institute General Configuration':
                    switch (subIndex) {
                        case 0:
                            stateObject.props.navigation.navigate("InstituteLogoConfig")
                            break
                        case 1:
                            stateObject.props.navigation.navigate("InstituteSubjectConfig")
                            break
                        case 2:
                            stateObject.props.navigation.navigate("InstituteFeeConfig")
                            break
                        case 3:
                            stateObject.props.navigation.navigate("InstituteOthersConfig")
                            break
                    }
                    break
                case 'Academic Year':
                    stateObject.props.navigation.navigate("InstituteYearConfiguration")
                    break
                case 'Institute Calendar':
                    stateObject.props.navigation.navigate("InstituteHoliday")
                    break
                case 'Assignee Group':
                    stateObject.props.navigation.navigate("InstituteGroup")
                    break
                case 'Staff Profiles':
                    stateObject.props.navigation.navigate("TeacherProfile")
                    break
                case 'Student Profiles':
                    stateObject.props.navigation.navigate("StudentProfile")
                    break
                case 'Class':
                    stateObject.props.navigation.navigate("InstituteClassConfig")
                    break

            }
            break
        case 1:
            switch (item) {
                case 'Online Staff Meetings':
                    stateObject.props.navigation.navigate("OnlineStaffMeeting")
                    break
                case 'View Meeting Attendance':
                    // Actions.ViewMeetingAttendance()
                    stateObject.props.navigation.navigate("ViewMeetingAttendance")
                    break

            }
            break
        case 2:
            switch (item) {
                case 'Activities/Events Planner':
                    stateObject.props.navigation.navigate("InstituteActivityEvent")
                    break
            }
            break

        case 3:
            switch (item) {
                case 'Fee Configuration':
                    stateObject.props.navigation.navigate("InstituteFeeManagement")
                    break
                case 'Fee Payment':
                    stateObject.props.navigation.navigate("InstituteFeePayment")
                    break
            }
            break
        case 4:
            switch (item) {
                case 'Template Configuration':
                    stateObject.props.navigation.navigate("InstituteNotificationTemplate")
                    break
                case 'Instant Notification':
                    stateObject.props.navigation.navigate("InstituteInstantNotification")
                    break

            }
            break
        case 5:
            switch (item) {
                case 'Staff Circulars':
                    stateObject.props.navigation.navigate("TeacherEcircular")
                    break
                case 'Student Circulars':
                    stateObject.props.navigation.navigate("StudentEcircular")
                    break
            }
            break
        case 6:
            switch (item) {
                case 'Staff Leaves':
                    stateObject.props.navigation.navigate("TeacherLeaveManagement")
                    break
            }
            break




        case 7:
            switch (item) {
                case 'Student Register':
                    stateObject.props.navigation.navigate("StudentRegisterReport")
                    break
                case 'Fees':
                    stateObject.props.navigation.navigate("FeesReport")
                    break
                case 'Payments':
                    stateObject.props.navigation.navigate("PaymentReport")
                    break

            }
            break
        case 8:
            switch (item) {

                case 'Notifications':
                    stateObject.props.navigation.navigate("StudentNotification")
                    break
                case 'Fee':
                    stateObject.props.navigation.navigate("StudentFee")
                    break
                case 'Payment Receipt':
                    stateObject.props.navigation.navigate("StudentPaymentReceipt")
                    break


            }

            break
        case 9:
            switch (item) {
                case 'Profile':
                    stateObject.props.navigation.navigate("UserProfile")
                    break
            }
            break



    }
}

// DrawerListUtils.TeacherSelected = async function (item, index, subIndex, stateObject) {

//     switch (index) {
//         case 0:
//             switch (item) {
//                 case 'Staff Profiles':
//                     // Actions.TeacherProfile()
//                     stateObject.props.navigation.navigate("TeacherProfile")

//                     break
//                 case 'Student Profiles':

//                     // Actions.StudentProfile()
//                     stateObject.props.navigation.navigate("StudentProfile")

//                     break
//                 case 'Class':
//                     // Actions.InstituteClassConfig()
//                     stateObject.props.navigation.navigate("InstituteClassConfig")
//                     break
//                 case 'Timetable':
//                     // Actions.ClassTimeTable()
//                     stateObject.props.navigation.navigate("ClassTimeTable")
//                     break
//                 case 'Student Register':
//                     // Actions.ClassStudentRegister()
//                     stateObject.props.navigation.navigate("ClassStudentRegister")
//                     break
//             }
//             break
//         case 1:
//             switch (item) {
//                 case 'Institute Holidays':
//                     Actions.Holiday()
//                     break

//             }
//             break
//         case 2:
//             switch (item) {
//                 case 'Attendance':
//                     // Actions.ClassAttendance()
//                     stateObject.props.navigation.navigate("ClassAttendance")
//                     break
//                 // start NEAI2-67
//                 case 'Assignment':
//                     // Actions.ClassAssignment()
//                     stateObject.props.navigation.navigate("ClassAssignment")
//                     break
//                 // end NEAI2-67   
//                 // start NEAI2-88
//                 case 'Assignment Assessment':
//                     // Actions.ClassAssessment()
//                     stateObject.props.navigation.navigate("ClassAssessment")
//                     break
//                 // end NEAI2-88     

//                 case 'Exam Configuration':
//                     // Actions.ClassExamSchedule()
//                     stateObject.props.navigation.navigate("ClassExamSchedule")
//                     break
//                 case 'Exam Assesment':
//                     // Actions.ClassExamAssessment()
//                     stateObject.props.navigation.navigate("ClassExamAssessment")
//                     break
//                 case 'Soft Skill Assessment':
//                     // Actions.ClassSoftSkillAssessment()
//                     stateObject.props.navigation.navigate("ClassSoftSkillAssessment")
//                     break
//                 case 'Video Lesson':
//                     // Actions.VideoAssignment()
//                     stateObject.props.navigation.navigate("VideoAssignment")
//                     break
//                 // starts NEAI2-47
//                 case 'Study Material':
//                     // Actions.StudyMaterial()
//                     stateObject.props.navigation.navigate("StudyMaterial")
//                     break
//                 // ends NEAI2-47   

//             }
//             break

//         case 3:
//             switch (item) {
//                 case 'Timetable':
//                     // Actions.TeacherTimeTable()
//                     stateObject.props.navigation.navigate("TeacherTimeTable")
//                     break
//                 // start NEAI-302
//                 case 'Lesson Planner':
//                     // Actions.TeacherLessonPlanner()
//                     stateObject.props.navigation.navigate("TeacherLessonPlanner")
//                     break
//                 // end NEAI-302
//                 // start NEAI2-62
//                 case 'Notes':
//                     // Actions.TeacherNotes()
//                     stateObject.props.navigation.navigate("TeacherNotes")
//                     break

//             }
//             break
//         case 4:
//             switch (item) {
//                 case 'Staff Leaves':
//                     // Actions.TeacherLeaveManagement()
//                     stateObject.props.navigation.navigate("TeacherLeaveManagement")
//                     break
//                 case 'Student Leaves':
//                     // Actions.StudentLeaveManagement()
//                     stateObject.props.navigation.navigate("StudentLeaveManagement")
//                     break
//             }
//             break
//         case 5:
//             switch (item) {
//                 case 'Staff Circulars':
//                     // Actions.TeacherEcircular()
//                     stateObject.props.navigation.navigate("TeacherEcircular")
//                     break
//                 case 'Student Circulars':
//                     // Actions.StudentEcircular()
//                     stateObject.props.navigation.navigate("StudentEcircular")
//                     break
//             }
//             break
//         case 6:
//             switch (item) {
//                 case 'Activities/Events':
//                     // Actions.InstituteExtraCurricular()
//                     stateObject.props.navigation.navigate("InstituteActivityEvent")
//                     break

//             }
//             break
//         case 7:
//             switch (item) {
//                 case 'Instant Notification':
//                     // Actions.InstituteNotification()
//                     stateObject.props.navigation.navigate("InstituteInstantNotification")
//                     break

//             }
//             break
//         // starts SHA030921
//         case 8:
//             switch (item) {
//                 case 'Online Video Classrooms':
//                     // Actions.OnlineVideoClassRoom()
//                     stateObject.props.navigation.navigate("OnlineVideoClassRoom")
//                     break
//                 case 'Online Staff Meetings':
//                     // Actions.OnlineStaffMeeting()
//                     stateObject.props.navigation.navigate("OnlineStaffMeeting")
//                     break
//                 case 'Online Parent/Student Meetings':
//                     // Actions.OnlineParentMeeting()
//                     stateObject.props.navigation.navigate("OnlineParentMeeting")
//                     break
//                 case 'View Meeting Attendance':
//                     Actions.ViewMeetingAttendance()
//                     break

//             }
//             break
//         //  ends SHA030921 
//         case 9:
//             switch (item) {
//                 // starts NEAI2-170
//                 case 'Knowledge Sharing Blogs':
//                     Actions.InstituteBlog()
//                     break
//                 // ends NEAI2-170                           
//             }
//             break
//         case 10:
//             switch (item) {
//                 case 'Student':
//                     // Actions.StudentReport()
//                     stateObject.props.navigation.navigate("StudentReport")
//                     break
//                 case 'Staff':
//                     // Actions.TeacherReport()
//                     stateObject.props.navigation.navigate("TeacherReport")
//                     break
//                 case 'Class':
//                     // Actions.ClassReport()
//                     stateObject.props.navigation.navigate("ClassReport")
//                     break

//                 case 'Student Register':
//                     // Actions.StudentRegisterReport()
//                     stateObject.props.navigation.navigate("StudentRegisterReport")
//                     break


//                 // start NEAI2-113  
//                 case 'Teacher Lesson Planner':
//                     // Actions.TeacherLessonPlannerReport()
//                     stateObject.props.navigation.navigate("TeacherLessonPlannerReport")
//                     break
//                 case 'Student Lesson Planner':
//                     // Actions.StudentLessonPlannerReport()
//                     stateObject.props.navigation.navigate("StudentLessonPlannerReport")
//                     break
//                 case 'Class Lesson Planner':
//                     // Actions.ClassLessonPlannerReport()
//                     stateObject.props.navigation.navigate("ClassLessonPlannerReport")
//                     break
//                 // end NEAI2-113 


//             }
//             break
//         case 11:
//             switch (item) {
//                 case 'Timetable':
//                     // Actions.StudentTimeTable()
//                     stateObject.props.navigation.navigate("StudentTimeTable")
//                     break
//                 case 'Attendance':
//                     // Actions.StudentAttendance()
//                     stateObject.props.navigation.navigate("StudentAttendance")
//                     break
//                 case 'Video Lesson':
//                     // Actions.StudentVideoAssignment()
//                     stateObject.props.navigation.navigate("StudentVideoAssignment")
//                     break
//                 case 'Exam Schedule':
//                     // Actions.StudentExamSchedule()
//                     stateObject.props.navigation.navigate("StudentExamSchedule")
//                     break
//                 case 'Progress Card':
//                     // Actions.StudentProgressCard()
//                     stateObject.props.navigation.navigate("StudentProgressCard")
//                     break
//                 case 'Soft Skills':
//                     // Actions.StudentSoftSkill()
//                     stateObject.props.navigation.navigate("StudentSoftSkill")
//                     break
//                 // start NEAI-305
//                 case 'Lesson Planner':
//                     // Actions.StudentLessonPlanner()
//                     stateObject.props.navigation.navigate("StudentLessonPlanner")
//                     break
//                 // end NEAI-305 
//                 // start NEAI2-49
//                 case 'Study Material':
//                     // Actions.StudentStudyMaterial()
//                     stateObject.props.navigation.navigate("StudentStudyMaterial")
//                     break
//                 // end NEAI2-49
//                 // start NEAI2-66
//                 case 'Student Notes':
//                     // Actions.StudentNotes()
//                     stateObject.props.navigation.navigate("StudentNotes")
//                     break
//                 // end NEAI2-66     
//                 // start NEAI2-68
//                 case 'Assignment':
//                     Actions.StudentAssignment()
//                     break
//                 // end NEAI2-68    
//                 case 'Extra Curricular Activity':
//                     // Actions.StudentCurricularActivity()
//                     stateObject.props.navigation.navigate("StudentCurricularActivity")
//                     break
//                 case 'Notifications':
//                     // Actions.StudentNotification()
//                     stateObject.props.navigation.navigate("StudentNotification")
//                     break
//                 case 'Fee':
//                     // Actions.StudentFee()
//                     stateObject.props.navigation.navigate("StudentFee")
//                     break
//                 case 'Payment Receipt':
//                     // Actions.StudentPayment()
//                     stateObject.props.navigation.navigate("StudentPaymentReceipt")
//                     break


//             }
//             break

//     }
// }

DrawerListUtils.TeacherSelected = async function (item, index, subIndex, stateObject) {

    switch (index) {
        case 0:
            switch (item) {
                case 'Staff Profiles':

                    stateObject.props.navigation.navigate("TeacherProfile")

                    break
                case 'Student Profiles':
                    stateObject.props.navigation.navigate("StudentProfile")

                    break
                case 'Class':
                    stateObject.props.navigation.navigate("InstituteClassConfig")
                    break
                case 'Timetable':
                    stateObject.props.navigation.navigate("ClassTimeTable")
                    break
                case 'Student Register':
                    stateObject.props.navigation.navigate("ClassStudentRegister")
                    break
            }
            break
        case 1:
            switch (item) {
                case 'Institute Holidays':
                    // Actions.Holiday()
                    stateObject.props.navigation.navigate("InstituteHoliday")
                    break

            }
            break
        case 2:
            switch (item) {
                case 'Attendance':
                    // Actions.ClassAttendance()
                    stateObject.props.navigation.navigate("ClassAttendance")
                    break


                case 'Exam Configuration':
                    // Actions.ClassExamSchedule()
                    stateObject.props.navigation.navigate("ClassExamSchedule")
                    break
                case 'Diary planner':
                    // stateObject.props.navigation.navigate("ClassExamAssessment")
                    stateObject.props.navigation.navigate("DiaryPlanner")
                    break
                case 'Parent Signature Tracking':
                    switch (subIndex) {
                        case 0:
                            stateObject.props.navigation.navigate("ClassProgressCard")
                            break
                        case 1:
                            stateObject.props.navigation.navigate("ClassSoftSkill")
                            break
                    }
                    break


            }
            break
        case 3:
            switch (item) {
                case 'Exam Assessment':
                    stateObject.props.navigation.navigate("ClassExamAssessment")
                    break
                case 'Soft Skill Assessment':
                    stateObject.props.navigation.navigate("ClassSoftSkillAssessment")
                    break
                case 'Assignment Assessment':
                    stateObject.props.navigation.navigate("ClassAssessment")
                    break
                case 'Exam Insights':
                    switch (subIndex) {
                        case 0:
                             stateObject.props.navigation.navigate("ClassProgressCard")
                            break
                        case 1:
                             stateObject.props.navigation.navigate("ClassSoftSkill")
                            break
                        case 2:
                             stateObject.props.navigation.navigate("ClassSoftSkill")
                            break
                    }
                    break
            }
            break
        case 4:
            switch (item) {
                case 'Video Lesson':
                    stateObject.props.navigation.navigate("VideoAssignment")
                    break
                case 'Study Material':
                    stateObject.props.navigation.navigate("StudyMaterial")
                    break
                case 'Assignment':
                    stateObject.props.navigation.navigate("ClassAssignment")
                    break
                case 'Notes':
                    switch (subIndex) {
                        case 0:
                            stateObject.props.navigation.navigate("TeacherNotes")
                            break
                        case 1:
                            stateObject.props.navigation.navigate("StudentNotes")
                            break

                    }
                    break
                case 'Lesson Planner':
                    switch (subIndex) {
                        case 0:
                            stateObject.props.navigation.navigate("TeacherLessonPlanner")
                            break
                        case 1:
                            stateObject.props.navigation.navigate("StudentLessonPlanner")
                            break

                    }
                    break
                case 'Knowledge Sharing Blogs':
                    // stateObject.props.navigation.navigate("ClassAssignment")
                    break
            }
            break
        case 5:
            switch (item) {
                case 'Online Video Classrooms':
                    stateObject.props.navigation.navigate("OnlineVideoClassRoom")
                    break
                case 'Online Staff Meetings':
                    stateObject.props.navigation.navigate("OnlineStaffMeeting")
                    break
                case 'Online Parent/Student Meetings':
                    stateObject.props.navigation.navigate("OnlineParentMeeting")
                    break
                case 'View Meeting Attendance':
                    // Actions.ViewMeetingAttendance()
                    stateObject.props.navigation.navigate("ViewMeetingAttendance")
                    break

            }
            break


        case 6:
            switch (item) {
                case 'Activities/Events Planner':
                    // Actions.InstituteExtraCurricular()
                    stateObject.props.navigation.navigate("InstituteActivityEvent")
                    break

            }
            break
        case 7:
            switch (item) {
                case 'Instant Notification':
                    // Actions.InstituteNotification()
                    stateObject.props.navigation.navigate("InstituteInstantNotification")
                    break

            }
            break
        // starts SHA030921
        case 8:
            switch (item) {
                case 'Staff Circulars':
                    stateObject.props.navigation.navigate("TeacherEcircular")
                    break
                case 'Student Circulars':
                    stateObject.props.navigation.navigate("StudentEcircular")
                    break
            }
            break

        case 9:
            switch (item) {
                case 'Staff Leaves':
                    stateObject.props.navigation.navigate("TeacherLeaveManagement")
                    break
                case 'Student Leaves':
                    stateObject.props.navigation.navigate("StudentLeaveManagement")
                    break
            }
            break
        case 10:
            switch (item) {
                case 'Timetable':
                    stateObject.props.navigation.navigate("TeacherTimeTable")
                    break

            }
            break
        case 11:
            switch (item) {
                case 'Student':
                    // Actions.StudentReport()
                    stateObject.props.navigation.navigate("StudentReport")
                    break
                case 'Staff':
                    // Actions.TeacherReport()
                    stateObject.props.navigation.navigate("TeacherReport")
                    break
                case 'Class':
                    // Actions.ClassReport()
                    stateObject.props.navigation.navigate("ClassReport")
                    break

                case 'Student Register':
                    // Actions.StudentRegisterReport()
                    stateObject.props.navigation.navigate("StudentRegisterReport")
                    break


                // start NEAI2-113  
                case 'Teacher Lesson Planner':
                    // Actions.TeacherLessonPlannerReport()
                    stateObject.props.navigation.navigate("TeacherLessonPlannerReport")
                    break
                case 'Student Lesson Planner':
                    // Actions.StudentLessonPlannerReport()
                    stateObject.props.navigation.navigate("StudentLessonPlannerReport")
                    break
                case 'Class Lesson Planner':
                    // Actions.ClassLessonPlannerReport()
                    stateObject.props.navigation.navigate("ClassLessonPlannerReport")
                    break
                // end NEAI2-113 
                case 'Monthly Attendance':
                    stateObject.props.navigation.navigate("MonthlyAttendanceReport")
                    break
                case 'Mark Register':
                    stateObject.props.navigation.navigate("MarkRegisterReport")
                    break


            }
            break
        case 12:
            switch (item) {
                case 'Timetable':
                    // Actions.StudentTimeTable()
                    stateObject.props.navigation.navigate("StudentTimeTable")
                    break
                case 'Attendance':
                    // Actions.StudentAttendance()
                    stateObject.props.navigation.navigate("StudentAttendance")
                    break
                case 'Video Lesson':
                    // Actions.StudentVideoAssignment()
                    stateObject.props.navigation.navigate("StudentVideoAssignment")
                    break
                case 'Exam Schedule':
                    // Actions.StudentExamSchedule()
                    stateObject.props.navigation.navigate("StudentExamSchedule")
                    break
                case 'Progress Card':
                    // Actions.StudentProgressCard()
                    stateObject.props.navigation.navigate("StudentProgressCard")
                    break
                case 'Soft Skills':
                    // Actions.StudentSoftSkill()
                    stateObject.props.navigation.navigate("StudentSoftSkill")
                    break
                // start NEAI-305
                case 'Lesson Planner':
                    // Actions.StudentLessonPlanner()
                    stateObject.props.navigation.navigate("StudentLessonPlanner")
                    break
                // end NEAI-305 
                // start NEAI2-49
                case 'Study Material':
                    // Actions.StudentStudyMaterial()
                    stateObject.props.navigation.navigate("StudentStudyMaterial")
                    break
                // end NEAI2-49
                // start NEAI2-66
                case 'Student Notes':
                    // Actions.StudentNotes()
                    stateObject.props.navigation.navigate("StudentNotes")
                    break
                // end NEAI2-66     
                // start NEAI2-68
                case 'Assignment':
                    // Actions.StudentAssignment()
                    stateObject.props.navigation.navigate("StudentAssignment")
                    break
                // end NEAI2-68    
                case 'Extra Curricular Activity':
                    // Actions.StudentCurricularActivity()
                    stateObject.props.navigation.navigate("StudentCurricularActivity")
                    break
                case 'Notifications':
                    // Actions.StudentNotification()
                    stateObject.props.navigation.navigate("StudentNotification")
                    break
                case 'Fee':
                    // Actions.StudentFee()
                    stateObject.props.navigation.navigate("StudentFee")
                    break
                case 'Payment Receipt':
                    // Actions.StudentPayment()
                    stateObject.props.navigation.navigate("StudentPaymentReceipt")
                    break


            }
            break

    }
}


// DrawerListUtils.ParentSelected = async function (item, index, subIndex, stateObject) {
//     // DrawerListUtils.ParentSelected = async function (item, index, parentIndex) {
//     switch (index) {
//         case 0:
//             switch (item) {
//                 case 'Student Profile':
//                     // Actions.ParentStudentProfile()
//                     break
//                 case 'Notifications':
//                     // Actions.StudentNotification()
//                     stateObject.props.navigation.navigate("StudentNotification")
//                     break
//                 case 'eCircular':
//                     // Actions.StudentEcircular()
//                     stateObject.props.navigation.navigate("StudentLevelEcircular")
//                     break
//                 case 'Institute Holidays':
//                     // Actions.Holiday()
//                     break
//             }
//             break
//         case 1:
//             switch (item) {

//                 case 'Timetable':
//                     // Actions.StudentTimeTable()
//                     stateObject.props.navigation.navigate("StudentTimeTable")
//                     break
//                 case 'Attendance':
//                     // Actions.StudentAttendance()
//                     stateObject.props.navigation.navigate("StudentAttendance")
//                     break
//                 case 'Leave Management':
//                     // Actions.StudentLeaveManagement()
//                     stateObject.props.navigation.navigate("ParentLeaveManagement")
//                     break
//                 case 'Extra Curricular Activity':
//                     // Actions.StudentCurricularActivity()
//                     stateObject.props.navigation.navigate("StudentCurricularActivity")
//                     break
//             }

//             break
//         // starts SHA030921
//         case 2:
//             switch (item) {
//                 case 'Online Video Classrooms':
//                     // Actions.OnlineVideoClassRoom()
//                     stateObject.props.navigation.navigate("OnlineVideoClassRoom")
//                     break
//                 case 'Online Parent/Student Meetings':
//                     // Actions.OnlineParentMeeting()
//                     stateObject.props.navigation.navigate("OnlineParentMeeting")
//                     break
//                 case 'View Meeting Attendance':
//                     Actions.ViewMeetingAttendance()
//                     break
//             }
//             break
//         //  ends SHA030921     
//         case 3:
//             switch (item) {
//                 case 'Exam Schedule':
//                     // Actions.StudentExamSchedule()
//                     stateObject.props.navigation.navigate("StudentExamSchedule")
//                     break
//                 case 'Progress Card':
//                     // Actions.StudentProgressCard()
//                     stateObject.props.navigation.navigate("StudentProgressCard")
//                     break
//                 case 'Soft Skill Assessment':
//                     // Actions.StudentSoftSkill()
//                     stateObject.props.navigation.navigate("StudentSoftSkill")
//                     break

//             }
//             break
//         case 4:
//             switch (item) {
//                 case 'Fee':
//                     // Actions.StudentFee()
//                     stateObject.props.navigation.navigate("StudentFee")
//                     break
//                 case 'Payment Receipt':
//                     // Actions.StudentPayment()
//                     stateObject.props.navigation.navigate("StudentPaymentReceipt")
//                     break
//             }

//             break
//         // start NEAI-305
//         case 5:
//             switch (item) {
//                 case 'Lesson Planner':
//                     // Actions.StudentLessonPlanner()
//                     stateObject.props.navigation.navigate("StudentLessonPlanner")
//                     break
//                 // start NEAI2-49
//                 case 'Study Material':
//                     // Actions.StudentStudyMaterial()
//                     stateObject.props.navigation.navigate("StudentStudyMaterial")
//                     break
//                 // end NEAI2-49 
//                 // start NEAI2-66
//                 case 'Notes':
//                     // Actions.StudentNotes()
//                     stateObject.props.navigation.navigate("StudentNotes")
//                     break
//                 // end NEAI2-66 
//                 // starts NEAI2-91
//                 case 'Knowledge Sharing Blogs':
//                     // Actions.InstituteBlog()
//                     break
//                 // ends NEAI2-91 
//                 // start NEAI2-68
//                 case 'Assignment':
//                     // Actions.StudentAssignment()
//                     break
//                 // end NEAI2-68
//                 case 'Video Lesson':
//                     // Actions.StudentVideoAssignment()
//                     stateObject.props.navigation.navigate("StudentVideoAssignment")
//                     break
//             }
//             break
//         // end NEAI-305

//         case 6:
//             switch (item) {
//                 case 'Student':
//                     // Actions.StudentReport()
//                     stateObject.props.navigation.navigate("StudentReport")
//                     break
//                 // Start NEAI2-113
//                 case 'Student Lesson Planner':
//                     // Actions.StudentLessonPlannerReport()
//                     stateObject.props.navigation.navigate("StudentLessonPlannerReport")
//                     break


//             }
//             break

//     }
// }


DrawerListUtils.ParentSelected = async function (item, index, subIndex, stateObject) {
    switch (index) {
        case 0:
            switch (item) {
                case 'Student Profile':
                    stateObject.props.navigation.navigate("StudentProfile")
                    break
                case 'Notifications':
                    stateObject.props.navigation.navigate("StudentNotification")
                    break
                case 'eCircular':
                    stateObject.props.navigation.navigate("StudentLevelEcircular")
                    break
                case 'Institute Holidays':
                    // Actions.Holiday()
                    stateObject.props.navigation.navigate("InstituteHoliday")
                    break
            }
            break
        case 1:
            switch (item) {

                case 'Timetable':
                    stateObject.props.navigation.navigate("StudentTimeTable")
                    break
                case 'Attendance':
                    stateObject.props.navigation.navigate("StudentAttendance")
                    break
                case 'Leave Management':
                    stateObject.props.navigation.navigate("ParentLeaveManagement")
                    break
                case 'Extra Curricular Activity':
                    stateObject.props.navigation.navigate("StudentCurricularActivity")
                    break
            }

            break
        case 2:
            switch (item) {
                case 'Lesson Planner':
                    stateObject.props.navigation.navigate("StudentLessonPlanner")
                    break
                case 'Study Material':
                    stateObject.props.navigation.navigate("StudentStudyMaterial")
                    break
                case 'Notes':
                    stateObject.props.navigation.navigate("StudentNotes")
                    break
                case 'Knowledge Sharing Blogs':
                    break
                case 'Assignment':
                    stateObject.props.navigation.navigate("StudentAssignment")
                    break
                case 'Video Lesson':
                    stateObject.props.navigation.navigate("StudentVideoAssignment")
                    break
            }
            break
        case 3:
            switch (item) {
                case 'Online Video Classrooms':
                    stateObject.props.navigation.navigate("OnlineVideoClassRoom")
                    break
                case 'Online Parent/Student Meetings':
                    stateObject.props.navigation.navigate("OnlineParentMeeting")
                    break
                case 'View Meeting Attendance':
                    // Actions.ViewMeetingAttendance()
                    stateObject.props.navigation.navigate("ViewMeetingAttendance")
                    break
            }
            break
       /* case 4:
            switch (item) {
                case 'Test Schedules':
                    // stateObject.props.navigation.navigate("OnlineVideoClassRoom")
                    break
                case 'Appear for Test':
                    // stateObject.props.navigation.navigate("OnlineParentMeeting")
                    break
                case 'Exam Insights':
                    // Actions.ViewMeetingAttendance()
                    break
            }
            break*/
        case 4:
            switch (item) {
                case 'Exam Schedule':
                    stateObject.props.navigation.navigate("StudentExamSchedule")
                    break
                case 'Progress Card':
                    stateObject.props.navigation.navigate("StudentProgressCard")
                    break
                case 'Soft Skill Assessment':
                    stateObject.props.navigation.navigate("StudentSoftSkill")
                    break
                case 'Exam Insights':
                    // Actions.ViewMeetingAttendance()
                    break

            }
            break
        case 5:
            switch (item) {
                case 'Fee':
                    stateObject.props.navigation.navigate("StudentFee")
                    break
                case 'Payment Receipt':
                    stateObject.props.navigation.navigate("StudentPaymentReceipt")
                    break
            }

            break


        case 6:
            switch (item) {
                case 'Student':
                    stateObject.props.navigation.navigate("StudentReport")
                    break
                case 'Student Lesson Planner':
                    stateObject.props.navigation.navigate("StudentLessonPlannerReport")
                    break


            }
            break

    }
}





module.exports = {
    functions: DrawerListUtils
};