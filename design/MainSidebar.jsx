import Link from 'next/link'
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
        <Card className="border-0 rounded-none">
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
                // width: "200px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "0px",
              }}
              onDragStart={(event) => onDragStart(event, "pool")}
            >
              <span>pool</span>
            </Card>
            <Card
              draggable
              style={{
                cursor: "grab",
                // width: "200px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "0px",
              }}
              onDragStart={(event) => onDragStart(event, "activity")}
            >
              <span>task</span>
            </Card>
            <Card
              draggable
              style={{
                cursor: "grab",
                // width: "200px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "0px",
              }}
              onDragStart={(event) => onDragStart(event, "startevent")}
            >
              <span>start event</span>
            </Card>
            <Card
              draggable
              style={{
                cursor: "grab",
                // width: "200px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "0px",
              }}
              onDragStart={(event) => onDragStart(event, "endevent")}
            >
              <span>end event</span>
            </Card>
            <Card
              draggable
              style={{
                cursor: "grab",
                // width: "200px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "0px",
              }}
              onDragStart={(event) => onDragStart(event, "interevent")}
            >
              <span>intermediate event</span>
            </Card>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card className="border-0 rounded-none">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              customize your settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <Link href="/prompts" target='_blank'>
          <Card
              draggable
              style={{
                cursor: "grab",
                // width: "300px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "0px",
              }}
              onDragStart={(event) => onDragStart(event, "pool")}
            >
              AI Assistant
            </Card>
          </Link>
          </CardContent>
          {/* <CardFooter>
          </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
