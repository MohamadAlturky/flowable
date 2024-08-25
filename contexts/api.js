import urls from "../configurations/apiConfiguration"
import axios from 'axios';
import Swal from "sweetalert2"

export const axiosInstance = axios.create({
  baseURL: urls.projectsUrl,
});

export const axiosInstanceAuth = axios.create({
  baseURL: urls.baseUrl
});
export const axiosInstanceStorage = axios.create({
  baseURL: urls.storageUrl
});

// axiosInstance.interceptors.response.use(
//   (response) => {

//     return response;
//   },
//   (error) => {
//     console.log("errorerrorerrorerrorerrorerrorerrorerrorerrorerrorerror");
//     console.log("errorerrorerrorerrorerrorerrorerrorerrorerrorerrorerror");
//     console.log("errorerrorerrorerrorerrorerrorerrorerrorerrorerrorerror");
//     console.log("errorerrorerrorerrorerrorerrorerrorerrorerrorerrorerror");
//     console.log("errorerrorerrorerrorerrorerrorerrorerrorerrorerrorerror");
//     console.log(error);
    
//     if (error.response && error.response.status === 401) {
//       const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         width: "450px",
//         showConfirmButton: false,
//         timer: 1500,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.onmouseenter = Swal.stopTimer;
//           toast.onmouseleave = Swal.resumeTimer;
//         },
//       });
//       Toast.fire({
//         icon: "error",
//         title: "session expired please login",
//       });
//       setTimeout(()=>{
//         if (typeof window !== 'undefined') {
//           window.location.href = '/auth/login';
//         }
//       },1300)
//     }

//     return Promise.reject(error);
//   }
// );

console.log(axiosInstance);