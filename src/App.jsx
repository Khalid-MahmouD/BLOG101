

import HomePage from "./pages/HomePage.jsx"
import MainLayout from './layouts/MainLayout.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import JobsPage from "./pages/JobsPage.jsx"
import NotFoundPage from './pages/NotFoundPage.jsx'
import JobPage, { jobLoader } from "./pages/JobPage.jsx"
import AddJobPage from "./pages/AddJobPage.jsx"
import { toast } from "react-toastify"
import EditJobPage from "./pages/EditJobPage.jsx"



function App() {
  async function addJob(newJob) {
    try {
      const res = await fetch(`/api/jobs`, {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json',

        },
        body: JSON.stringify(newJob),
      })
      if (res.ok) return true;
      else {
        throw new Error('ERROR IN ADDING JOB')
      }

    } catch (error) {
      toast.error(error.message);
    }
    // TODO: Reset the form
    // TODO: DELETE operation
  }
  async function deleteJob(id) {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) console.log('All SET');

    } catch (error) {
      console.log('Error DELETING Job', error.message);
    }
  }
  async function updateJob(job) {
    try {
      const res = await fetch(`/api/job/${job.id}`, {
        method: 'PUT',
        headers: {

          'Content-Type': 'application/json',

        },
        body: JSON.stringify(job),
      })
      if (res.ok) return true;
      else {
        throw new Error('ERROR EDITING JOB...')
      }

    } catch (error) {
      toast.error(error.message);
    }
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />

        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>

    )
  )
  return (
    <RouterProvider router={router}>


    </RouterProvider>
  )
}

export default App
