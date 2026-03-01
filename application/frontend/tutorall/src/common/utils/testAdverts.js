/*
  Test data for user adverts  for profile advert testing.

  - Matthew A. Davis
*/

export const adverts = [
    {
        "id": 1,
        "users": {
            "name": "Alice Smith",
            "email": "alice.smith@example.com",
            "bio": "Graduate student in Mathematics",
            "education": "M.S. Computer Science",
            "location": "Boston, MA",
            "profile_picture": "http://localhost:8080/app/media/contributors/images/user-2517433_1280.jpg"
        },
        "courses": [
            {
                "name": "Intro to Computer Science",
                "professor": [
                    {
                        "name": "Dr. Alice Smith"
                    }
                ]
            }
        ],
        "catagories": [
            {
                "name": "Computer Science"
            }
        ],
        "location": "Boston, MA",
        "price_range": "25.00",
        "files": {
            "name": "Syllabus - Intro to CS",
            "file_type": "http://localhost:8080/app/media/files/test_image.png",
            "uploader": {
                "name": "Alice Smith"
            },
            "upload_date": "2025-11-01T10:00:00Z"
        },
        "verified": false
    },
    {
        "id": 2,
        "users": {
            "name": "Bob Johnson",
            "email": "bob.johnson@email.com",
            "bio": "Undergraduate student offering tutoring in data structures and discrete math.",
            "education": "B.S. Computer Science",
            "location": "New York, NY",
            "profile_picture": "http://localhost:8080/app/media/contributors/images/user-2517433_1280.jpg"
        },
        "courses": [
            {
                "name": "Linear Algebra",
                "professor": [
                    {
                        "name": "Dr. Bob Johnson"
                    }
                ]
            },
            {
                "name": "Electrodynamics and Magnetism",
                "professor": [
                    {
                        "name": "Dr. Carol Lee"
                    }
                ]
            }
        ],
        "catagories": [
            {
                "name": "Mathematics"
            },
            {
                "name": "Physics"
            }
        ],
        "location": "Remote",
        "price_range": "100.00",
        "files": {
            "name": "Lecture Notes 1",
            "file_type": "http://localhost:8080/app/media/files/test_image.png",
            "uploader": {
                "name": "Bob Johnson"
            },
            "upload_date": "2025-11-02T12:30:00Z"
        },
        "verified": true
    },
    {
        "id": 3,
        "users": {
            "name": "Alice Smith",
            "email": "alice.smith@example.com",
            "bio": "Graduate student in Mathematics",
            "education": "M.S. Computer Science",
            "location": "Boston, MA",
            "profile_picture": "http://localhost:8080/app/media/contributors/images/user-2517433_1280.jpg"
        },
        "courses": [
            {
                "name": "Intro to Computer Science",
                "professor": [
                    {
                        "name": "Dr. Alice Smith"
                    }
                ]
            },
            {
                "name": "Electrodynamics and Magnetism",
                "professor": [
                    {
                        "name": "Dr. Carol Lee"
                    }
                ]
            }
        ],
        "catagories": [
            {
                "name": "Computer Science"
            },
            {
                "name": "Physics"
            }
        ],
        "location": "New York, NY",
        "price_range": "45.00",
        "files": {
            "name": "Profile Image",
            "file_type": "http://localhost:8080/app/media/files/test_image.png",
            "uploader": {
                "name": "Alice Smith"
            },
            "upload_date": "2025-11-03T09:15:00Z"
        },
        "verified": true
    }
]

export default adverts;
