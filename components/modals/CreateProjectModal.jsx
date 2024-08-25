import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAuthTokens } from "../../services/auth/AuthServices"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Swal from "sweetalert2";

import { axiosInstance } from "../../contexts/api"



export default function CreateProjectModal({ isOpen, setIsOpen }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [projectType, setProjectType] = React.useState("1");

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        try {
          inputRef.current.focus();
        } catch (err) {
          console.log(err);
        }
      }, 0);
    }
  }, [isOpen]);

  const showErrorToast = (message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      width: "450px",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "error",
      title: message,
    });
  };

  const validateForm = () => {
    if (name == "") {
      showErrorToast("Name is required.");
      return false
    }
    if (description == "") {
      showErrorToast("Description is required.");
      return false
    }
    if (projectType == "0") {
      showErrorToast("Project type is required.");
      return false
    }
    return true
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsOpen(false);
      Swal.showLoading();
      const data = {
        "name": name,
        "description": description,
        "projectType": parseInt(projectType)
      };
      console.log(data);

      try {
        let token = getAuthTokens().accessToken

        const response = await axiosInstance.post('/api/projects', data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );
        Swal.fire({
          icon: "success",
          title: "Project created successfully!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        setProjectType("1")
        setName('')
        setDescription('')
        console.log('Response:', response.data);
      } catch (error) {
        if (error.response && error.response.status != 401) {

          Swal.fire({
            icon: "error",
            title: "Failed to create project!",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          })
        }
        if (error.response && error.response.status === 401) {

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            width: "450px",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: "session expired please login",
          });
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/login';
            }
          }, 1300)

        }

        Swal.hideLoading();

        console.error('Error creating project:', error);
      }

    }
  };

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Create Project</DrawerTitle>
            <DrawerDescription>Write the project information.</DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit}>

            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex-1 text-center">
                  <Label className="flex justify-start mb-2">Name</Label>
                  <Input
                    className="mb-2"
                    ref={inputRef}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Name"
                  />

                  <Label className="flex justify-start mb-2">Description</Label>
                  <Textarea
                    className="mb-2 h-44"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Description"
                  />

                  <Label className="flex justify-start mb-2">Type</Label>
                  <Select value={projectType} onValueChange={(e) => setProjectType(e)} defaultValue="1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of the project." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem disabled  value="1">Public Comming Soon</SelectItem>
                      <SelectItem selected value="2">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DrawerFooter style={{
              paddingBottom: "10px"
            }}>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                }}
              >
                Create
              </Button>
            </DrawerFooter>
          </form>

          <DrawerFooter style={{
            paddingTop: "0px"
          }}>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
          <div className="mt-3 h-[120px]"></div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}