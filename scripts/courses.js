const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will teach the use of functions in programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce object-oriented programming.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on Web Fundamentals and adds JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course covers frontend web development.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

function displayCourses(list) {
    const container = document.getElementById("courses-container");
    container.innerHTML = "";

    list.forEach(function(course) {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) {
            card.classList.add("completed");
        }
        card.textContent = course.subject + " " + course.number;
        container.appendChild(card);
    });

    const totalCredits = list.reduce(function(sum, course) {
        return sum + course.credits;
    }, 0);

    document.getElementById("total-credits").textContent = totalCredits;
}
displayCourses(courses);
document.getElementById("btn-all").addEventListener("click", function() {
    setActiveBtn(this);
    displayCourses(courses);
});

document.getElementById("btn-wdd").addEventListener("click", function() {
    setActiveBtn(this);
    const wddCourses = courses.filter(function(c) {
        return c.subject === "WDD";
    });
    displayCourses(wddCourses);
});

document.getElementById("btn-cse").addEventListener("click", function() {
    setActiveBtn(this);
    const cseCourses = courses.filter(function(c) {
        return c.subject === "CSE";
    });
    displayCourses(cseCourses);
});

function setActiveBtn(btn) {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(function(b) {
        b.classList.remove("active-btn");
    });
    btn.classList.add("active-btn");
}