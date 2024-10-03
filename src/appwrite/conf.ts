const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteMyInfoCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_MYINFO_ID),
    appwriteEducationCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_EDUCATION_ID),
    appwriteProjectsCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_PROJECTS_ID),
    appwriteSkillsCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_SKILLS_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUKET_ID),
    appwriteAchievementId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ACHIVEMENTS_ID),
    appwriteExperienceId: String(import.meta.env.VITE_APPWRITE_COLLECTION_EXPERIENCE_ID),
    appwriteReviewId: String(import.meta.env.VITE_APPWRITE_REVIEW_ID),
}

export default conf;