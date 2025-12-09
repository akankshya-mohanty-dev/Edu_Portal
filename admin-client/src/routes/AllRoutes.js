import Home from "../screens/users/Home";
import Profile from "../screens/auth/Profile";
import NotFound from "../screens/Common/NotFound";
import Login from "../screens/nonAuth/Login";
import Dashboard from "../screens/auth/Dashboard";
import TeacherDashboard from "../screens/auth/TeacherDashboard";
import StudentDashboard from "../screens/auth/StudentDashboard";
import UserManagement from "../screens/auth/UserManagement";
import CourseApproval from "../screens/auth/CourseApproval";
import Transactions from "../screens/auth/Transactions";
import TeacherCourse from "../screens/auth/TeacherCourse";
export const authRoutes = [
  {
    path: "/profile",
    component: <Profile />,
  },

  //dashboard section
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    path: "/teacher-dashboard",
    component: <TeacherDashboard />,
  },
  {
    path: "/student-dashboard",
    component: <StudentDashboard />,
  },

  //user management
  {
    path: "/user-management",
    component: <UserManagement />,
  },
  {
    path: "/course-approval",
    component: <CourseApproval />,
  },
  {
    path: "/transaction-payment",
    component: <Transactions />,
  },

  //teacher
  {
    path: "/teacher-course",
    component: <TeacherCourse />,
  },
];

export const nonAuthRoutes = [
  {
    path: "/login",
    component: <Login />,
  },
 
];

export const userRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  { path: "*", component: <NotFound /> },
];
