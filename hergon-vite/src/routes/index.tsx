import { App } from "@/App";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { 
  Areas, 
  Companies, 
  ContactUs, 
  Dashboard, 
  Departments, 
  ErrorPage, 
  FirstSteps, 
  Inventories, 
  Login, 
  Records, 
  RegisterCompany,
  RegisterUser, 
  Settings, 
  Tasks, 
  Uploads, 
  Users, 
  Workstations
} from "@/pages";

import { LoginRegister } from "@/pages/LoginRegister";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { ProtectedRoute } from "./ProtectedRoute";



export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/********** NO-AUTHENTICATED ROUTES**********/}
      <Route element={<App/>}>
        <Route path="/" element={<Login />}/>
      </Route>
      <Route element={<App/>}>
        <Route path="/loginRegister" element={<LoginRegister />}/>
      </Route>
      <Route element={<App/>}>
        <Route path="/forgotPassword" element={<ForgotPassword />}/>
      </Route>

      {/********** AUTHENTICATED ROUTES**********/}
      <Route element={<App/>}>
        <Route 
          path="/areas" 
          element={
            <ProtectedRoute>
              <Areas />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/companies" 
          element={
            <ProtectedRoute>
              <Companies/>
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/registerCompany" 
          element={
            <ProtectedRoute>
              <RegisterCompany/>
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/registerCompany" 
          element={
            <ProtectedRoute>
              <RegisterCompany/>
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/contactus" 
          element={
            <ProtectedRoute>
              <ContactUs/>
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/contactus" 
          element={
            <ProtectedRoute>
              <ContactUs/>
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/departments" 
          element={
            <ProtectedRoute>
              <Departments />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/firststeps" 
          element={
            <ProtectedRoute>
              <FirstSteps />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/inventories" 
          element={
            <ProtectedRoute>
              <Inventories />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/recordds" 
          element={
            <ProtectedRoute>
              <Records />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/tasks" 
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/uploads" 
          element={
            <ProtectedRoute>
              <Uploads />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/registerUser" 
          element={
            <ProtectedRoute>
              <RegisterUser />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route element={<App/>}>
        <Route 
          path="/workstations" 
          element={
            <ProtectedRoute>
              <Workstations />
            </ProtectedRoute>
          } 
        />
      </Route>  

      {/********** NOT FOUND**********/}
      <Route element={<App/>}>
        <Route path="*" element={<ErrorPage />}/>
      </Route>
    </>
  )
)

