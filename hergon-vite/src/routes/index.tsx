import { App } from "@/App";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { 
  Areas, 
  Companies, 
  ContactUs, 
  Dashboard, 
  Departments, 
  ErrorPage, 
  FrequentQuestions, 
  Inventories, 
  Login, 
  Records, 
  Settings, 
  Tasks, 
  Uploads, 
  Users, 
  Workstations,
  Enchiridions,
  Risks,
  RevalidateRisk,
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
          path="/frequentQuestions" 
          element={
            <ProtectedRoute>
              <FrequentQuestions />
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
          path="/records" 
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
          path="/workstations" 
          element={
            <ProtectedRoute>
              <Workstations />
            </ProtectedRoute>
          } 
        />
      </Route>  

      <Route element={<App/>}>
        <Route 
          path="/enchiridions" 
          element={
            <ProtectedRoute>
              <Enchiridions />
            </ProtectedRoute>
          } 
        />
      </Route> 

      <Route element={<App/>}>
        <Route 
          path="/risks" 
          element={
            <ProtectedRoute>
              <Risks />
            </ProtectedRoute>
          } 
        />
      </Route> 

      <Route element={<App/>}>
        <Route 
          path="/revalidateRisk" 
          element={
            <ProtectedRoute>
              <RevalidateRisk />
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

