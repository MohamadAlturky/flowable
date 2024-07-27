import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

export default function MainSidebar() {
  return (
    <Tabs defaultValue="components" className="rounded-none">
      <TabsList className="d-flex justify-center w-full rounded-none">
        <TabsTrigger value="components">Components</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent
        value="components"
      >
        <Card className="border-0 rounded-none flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle>Dragables</CardTitle>
            <CardDescription>
              drag and drop to start modeling.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Card
              draggable
              style={{
                cursor: "grab",
                width: "200px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "0px",
              }}
              onDragStart={(event) => onDragStart(event, "pool")}
            >
              <span>pool</span>
            </Card>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card className="border-0 rounded-none">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
