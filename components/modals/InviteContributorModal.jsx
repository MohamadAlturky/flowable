import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { axiosInstanceAuth,axiosInstance } from "../../contexts/api"
import { getAuthTokens } from "../../services/auth/AuthServices"

export default function InviteContributorModal({ isOpen, setIsOpen, project }) {
  const [userName, setUserName] = React.useState("");
  const [userId, setUserId] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [userNames, setUserNames] = React.useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
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
    Swal.fire({
      icon: "error",
      title: message,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  const validateForm = () => {
    if (userName === "") {
      showErrorToast("Email is required.");
      return false;
    }
    if (message === "") {
      showErrorToast("Description is required.");
      return false;
    }
    if (userId === null) {
      showErrorToast("Please select a user");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      /////////
      setIsOpen(false);
      Swal.showLoading();
      const data = {
        "project": parseInt(project),
        "contributor": parseInt(userId),
        "message": message
      };
      console.log(data);

      try {
        let token = getAuthTokens().accessToken

        const response = await axiosInstance.post('/api/invitations', data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );
        Swal.fire({
          icon: "success",
          title: "Invitaion created successfully!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        setMessage("")
        setUserId(null)
        setMessage('')
        console.log('Response:', response.data);
      } catch (error) {
        if (error.response && error.response.status != 401) {

          Swal.fire({
            icon: "error",
            title: "Failed to create invitation!",
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

        console.error('Error creating invitation:', error);
      }



      ////////
    }
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(async () => {
        await func(...args);
      }, delay);
    };
  };

  const generateUsernames = async (input) => {
    if(input && input.length < 4)
    {
      Swal.fire({
        icon: "error",
        title: "Please write 4 chracters at least.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      return
    }
    if (input) {

      // 
      try {
        let token = getAuthTokens().accessToken

        const response = await axiosInstanceAuth.get(`/users?emailSubstring=${input}`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
      );
      console.log(response.data);
      
      if(response.data.length==0)
      {
        Swal.fire({
          icon: "error",
          title: "No Matching Sorry",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
      }
      setUserNames(response.data)
    } catch (error) {
      if (error.response && error.response.status != 401) {

        Swal.fire({
          icon: "error",
          title: "Failed to search for email!",
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
      console.error('Error creating project:', error);
    }


    // 

    setIsDropdownOpen(true);
  } else {
    setUserNames([]);
  setIsDropdownOpen(false);
}
  };

// Debounced version of generateUsernames
const debouncedGenerateUsernames = React.useCallback(
  debounce(generateUsernames, 800),
  []
);

const handleInputChange = (e) => {
  const input = e.target.value;
  setUserName(input);
  debouncedGenerateUsernames(input);
};

const handleUsernameClick = (username) => {
  setUserName(username);
  setUserId(userNames.filter(e=>e.email == username)[0].id)
  setIsDropdownOpen(false);
};

return (
  <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
    <DrawerContent>
      <div className="mx-auto w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle>Invite User {userId}</DrawerTitle>
          <DrawerDescription>Write the user information.</DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1 text-center max-h-64 relative">
                <Label className="flex justify-start mb-2">User Name</Label>
                <Input
                  className="mb-2"
                  ref={inputRef}
                  onChange={handleInputChange}
                  value={userName}
                  placeholder="🔍 Search The user email"
                />
                {isDropdownOpen && userNames.length > 0 && (
                  <ul className="absolute bg-white border border-gray-300 w-full rounded-md shadow-lg mt-1 z-10">
                    {userNames.map((user, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-200 cursor-pointer w-full"
                        onClick={() => handleUsernameClick(user.email)}
                      >
                        {user.email}
                      </li>
                    ))}
                  </ul>
                )}
                <Label className="flex justify-start mb-2">Message</Label>
                <Textarea
                  className="mb-2 h-44"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  placeholder="write the invitaion message"
                />
              </div>
            </div>
          </div>
          <DrawerFooter style={{ paddingBottom: "10px" }}>
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
        <DrawerFooter style={{ paddingTop: "0px" }}>
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
