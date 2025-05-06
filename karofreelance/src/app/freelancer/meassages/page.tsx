"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Paperclip, MoreHorizontal, Phone, Video, MessageSquare } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-tost"

export default function FreelancerMessages() {
  const { toast } = useToast()
  const [activeChat, setActiveChat] = useState("chat-1")
  const [messageText, setMessageText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for chats
  const allChats = [
    {
      id: "chat-1",
      client: {
        id: "client-1",
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        project: "E-commerce Website Development",
      },
      messages: [
        {
          id: "msg-1",
          sender: "freelancer",
          text: "Hi John, I've completed the first milestone for the e-commerce project. You can check it out in the development environment.",
          time: "10:30 AM",
          date: "Today",
        },
        {
          id: "msg-2",
          sender: "client",
          text: "That's great news! I'll take a look at it right away.",
          time: "10:45 AM",
          date: "Today",
        },
        {
          id: "msg-3",
          sender: "freelancer",
          text: "Let me know if you have any feedback or if there are any changes you'd like me to make.",
          time: "10:47 AM",
          date: "Today",
        },
        {
          id: "msg-4",
          sender: "client",
          text: "I just checked it out. The product listing page looks amazing! Could we make the add to cart button a bit more prominent?",
          time: "11:15 AM",
          date: "Today",
        },
        {
          id: "msg-5",
          sender: "freelancer",
          text: "I'll increase the button size and maybe add a subtle animation on hover. I'll have that ready for you by tomorrow.",
          time: "11:20 AM",
          date: "Today",
        },
      ],
    },
    {
      id: "chat-2",
      client: {
        id: "client-2",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
        project: "API Integration for Payment Gateway",
      },
      messages: [
        {
          id: "msg-1",
          sender: "client",
          text: "I've reviewed your proposal for the API integration project. I'd like to discuss a few details before we get started.",
          time: "Yesterday",
          date: "Yesterday",
        },
        {
          id: "msg-2",
          sender: "freelancer",
          text: "Of course, I'm available to discuss the project details. What specific aspects would you like to go over?",
          time: "Yesterday",
          date: "Yesterday",
        },
      ],
    },
    {
      id: "chat-3",
      client: {
        id: "client-3",
        name: "Tech Innovations Inc.",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        project: "New Project Opportunity",
      },
      messages: [
        {
          id: "msg-1",
          sender: "client",
          text: "We'd like to discuss a new project opportunity with you. Are you available for a call tomorrow?",
          time: "3 days ago",
          date: "Monday",
        },
        {
          id: "msg-2",
          sender: "freelancer",
          text: "I'd be happy to discuss the new opportunity. I'm available tomorrow between 10 AM and 2 PM. Would any time in that range work for you?",
          time: "3 days ago",
          date: "Monday",
        },
      ],
    },
  ]

  // Filter chats based on search query
  const filteredChats = allChats.filter(
    (chat) =>
      chat.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.client.project.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const currentChat = allChats.find((chat) => chat.id === activeChat)

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    // In a real app, you would send this to your backend
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    })

    setMessageText("")
  }

  return (
    <DashboardSidebar userType="freelancer">
      <div className="h-[calc(100vh-180px)] flex border rounded-lg overflow-hidden">
        {/* Chat list sidebar */}
        <div className="w-full max-w-xs border-r bg-muted/30">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-240px)]">
            {filteredChats.map((chat) => (
              <div key={chat.id}>
                <button
                  className={`w-full text-left p-3 hover:bg-muted transition-colors ${activeChat === chat.id ? "bg-muted" : ""}`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={chat.client.avatar || "/placeholder.svg"} alt={chat.client.name} />
                        <AvatarFallback>{chat.client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${chat.client.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                      ></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{chat.client.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {chat.messages[chat.messages.length - 1].time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.messages[chat.messages.length - 1].text}
                      </p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {chat.client.project}
                      </Badge>
                    </div>
                  </div>
                </button>
                <Separator />
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat area */}
        {currentChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="p-4 border-b flex items-center justify-between bg-muted/30">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={currentChat.client.avatar || "/placeholder.svg"} alt={currentChat.client.name} />
                  <AvatarFallback>{currentChat.client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{currentChat.client.name}</h3>
                    <span
                      className={`ml-2 w-2 h-2 rounded-full ${currentChat.client.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                    ></span>
                  </div>
                  <p className="text-sm text-muted-foreground">{currentChat.client.project}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {currentChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "freelancer" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "client" && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage
                          src={currentChat.client.avatar || "/placeholder.svg"}
                          alt={currentChat.client.name}
                        />
                        <AvatarFallback>{currentChat.client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.sender === "freelancer" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No conversation selected</h3>
              <p className="text-muted-foreground">Select a conversation from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </DashboardSidebar>
  )
}
