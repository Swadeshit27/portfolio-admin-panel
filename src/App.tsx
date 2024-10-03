import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import PublicPage from "./components/PublicRoute";
import PrivatePage from "./components/PrivateRoute";
import Achievements from "./pages/achievements/achievements";
import AllAchievements from "./pages/achievements/AllAchievements";
import AddAchievements from "./pages/achievements/AddAchievements";
import EditAchievements from "./pages/achievements/edit-achievements";
import AllExperience from "./pages/experience/all-experiences";
import AddExperience from "./pages/experience/add-experience";
import EditExperience from "./pages/experience/edit-experience";
import Info from "./pages/my-info/info";
import AllInfo from "./pages/my-info/my-info";
import AddInfo from "./pages/my-info/add-info";
import EditInfo from "./pages/my-info/edit-info";
import Education from "./pages/education/education";
import AllEducation from "./pages/education/all-education";
import AddEducation from "./pages/education/add-education";
import EditEducation from "./pages/education/edit-education";
import Projects from "./pages/projects/projects";
import AllProjects from "./pages/projects/all-projects";
import AddProject from "./pages/projects/add-project";
import EditProject from "./pages/projects/edit-project";
import Skills from "./pages/skills/skills";
import AllSkills from "./pages/skills/all-skills";
import AddSkill from "./pages/skills/add-skill";
import EditSkill from "./pages/skills/edit-skill";
import Experience from "./pages/experience/Experience";
import { useEffect } from "react";
import authService from "./appwrite/auth"; 
import Reviews from "./pages/reviews/reviews";
import AllReviews from "./pages/reviews/all-reviews";

function App() {

  const getCurrentUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        sessionStorage.setItem('isLoggedIn', 'true');
      }
    } catch (error) { 
      sessionStorage.setItem('isLoggedIn', 'false');
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <PrivatePage>
                <Info />
              </PrivatePage>
            }
          >
            <Route
              path=""
              element={
                <PrivatePage>
                  <AllInfo />
                </PrivatePage>
              }
            />
            <Route
              path="add"
              element={
                <PrivatePage>
                  <AddInfo />
                </PrivatePage>
              }
            />
            <Route
              path="edit/:id"
              element={
                <PrivatePage>
                  <EditInfo />
                </PrivatePage>
              }
            />
          </Route>
          <Route
            path="education"
            element={
              <PrivatePage>
                <Education />
              </PrivatePage>
            }
          >
            <Route
              path=""
              element={
                <PrivatePage>
                  <AllEducation />
                </PrivatePage>
              }
            />
            <Route
              path="add"
              element={
                <PrivatePage>
                  <AddEducation />
                </PrivatePage>
              }
            />
            <Route
              path="edit/:id"
              element={
                <PrivatePage>
                  <EditEducation />
                </PrivatePage>
              }
            />
          </Route>
          <Route
            path="projects"
            element={
              <PrivatePage>
                <Projects />
              </PrivatePage>
            }
          >
            <Route
              path=""
              element={
                <PrivatePage>
                  <AllProjects />
                </PrivatePage>
              }
            />
            <Route
              path="add"
              element={
                <PrivatePage>
                  <AddProject />
                </PrivatePage>
              }
            />
            <Route
              path="edit/:id"
              element={
                <PrivatePage>
                  <EditProject />
                </PrivatePage>
              }
            />
          </Route>
          <Route
            path="skills"
            element={
              <PrivatePage>
                <Skills />
              </PrivatePage>
            }
          >
            <Route
              path=""
              element={
                <PrivatePage>
                  <AllSkills />
                </PrivatePage>
              }
            />
            <Route
              path="add"
              element={
                <PrivatePage>
                  <AddSkill />
                </PrivatePage>
              }
            />
            <Route
              path="edit/:id"
              element={
                <PrivatePage>
                  <EditSkill />
                </PrivatePage>
              }
            />
          </Route>
          <Route
            path="achievements"
            element={
              <PrivatePage>
                <Achievements />
              </PrivatePage>
            }
          >
            <Route
              path=""
              element={
                <PrivatePage>
                  <AllAchievements />
                </PrivatePage>
              }
            />
            <Route
              path="add"
              element={
                <PrivatePage>
                  <AddAchievements />
                </PrivatePage>
              }
            />
            <Route
              path="edit/:id"
              element={
                <PrivatePage>
                  <EditAchievements />
                </PrivatePage>
              }
            />
          </Route>
          <Route
            path="experience"
            element={
              <PrivatePage>
                <Experience />
              </PrivatePage>
            }
          >
            <Route
              path=""
              element={
                <PrivatePage>
                  <AllExperience />
                </PrivatePage>
              }
            />
            <Route
              path="add"
              element={
                <PrivatePage>
                  <AddExperience />
                </PrivatePage>
              }
            />
            <Route
              path="edit/:id"
              element={
                <PrivatePage>
                  <EditExperience />
                </PrivatePage>
              }
            />
          </Route>
          <Route
            path="reviews"
            element={
              <PrivatePage>
                <Reviews />
              </PrivatePage>
            }
          >
            <Route
              path=""
              element={
                <PrivatePage>
                  <AllReviews />
                </PrivatePage>
              }
            />
            <Route
              path="add"
              element={
                <PrivatePage>
                  <AddExperience />
                </PrivatePage>
              }
            />
            <Route
              path="edit/:id"
              element={
                <PrivatePage>
                  <EditExperience />
                </PrivatePage>
              }
            />
          </Route>
        </Route>
        <Route
          path="/login"
          element={
            <PublicPage>
              <Login />
            </PublicPage>
          }
        />
      </Routes>
    </>
  );
}

export default App;
