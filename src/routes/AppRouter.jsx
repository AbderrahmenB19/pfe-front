import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, FormBuilder, ProcessDefinition } from '../pages';
import AdminLayout from '../layout/AdminLayout';
import ValidatorDashboard from '../pages/validator/ValidatorDashboard';
import ValidatorLayout from '../layout/ValidatorLayout';
import UserLayout from '../layout/UserLayout';
import UserForm from '../pages/User/FormPage/UserForm';
import ProcessTable from '../pages/User/ProcessTable.jsx/ProcessTable';
//import AdminLayout from '../layouts/AdminLayout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Home />} />
          <Route path="/admin/form-builder" element={<FormBuilder />} />
          <Route path="/admin/process-definition" element={<ProcessDefinition />} />
        </Route>
        <Route element={<ValidatorLayout/>}>
          <Route path="/validator" element={<ValidatorDashboard />} />
        </Route>
        <Route path="/" element={<UserLayout />}>
        <Route index element={<UserForm />} />
        <Route path="form" element={<UserForm />} />
        <Route path="processes" element={<ProcessTable />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;