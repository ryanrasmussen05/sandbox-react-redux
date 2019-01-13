export interface Resume {
    education: EducationItem[];
    employment: EmploymentItem[];
}

export interface EmploymentItem {
    title: string;
    company: string;
    location: string;
    start: string;
    end: string;
    image: string;
    bullets: string[];
}

export interface EducationItem {
    degree: string;
    school: string;
    location: string;
    gpa: string;
    image: string;
    graduationDate: string;
}