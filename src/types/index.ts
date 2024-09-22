export interface loginProps {
    email: string;
    password: string;
}

export interface infoProps {
    $id: string;
    name: string;
    homeSubtitles: string;
    homeDescription: string;
    homeImg: string;
    aboutImg: string;
    aboutDescription: string;
    resume: string;
    github: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    mobile: string;
    email: string;
    shortAddress: string;
    fullAddress: string;
    leetcode?: string;
    codeforces?: string;
    hackerrank?: string;
    codechef?: string;
    geekforgeeks?: string;
    codestudio?: string;
}

export interface educationProps {
    $id: string;
    course: string;
    description: string;
    duration: string;
    result: string;
    institute: string;
    marks: string;
}

export interface projectProps {
    $id: string;
    imgSrc: string;
    title: string;
    description: string;
    isBest: boolean;
    best?: string | boolean;
    tags: string;
    category: string;
    githubLink: string;
    demoLink: string;
}

export interface SkillProps {
    $id: string;
    icon: string;
    name: string;
    category: string;
    details: string;
}

export interface AchievementProps {
    $id: string;
    title: string;
    description: string;
    attachment: string;
    fileLink: string;
}

export interface ExperienceProps {
    $id: string;
    title: string;
    duration: string;
    description: string;
    place: string;
    certificate: string;
    offerLetter: string;
    lor: string;
    optional: string;
    category: string;
    techTools: string;
    position: string;
}