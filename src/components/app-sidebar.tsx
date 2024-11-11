import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/authProvider/useAuth"
import { Calculator, FeatherIcon, PersonStanding } from "lucide-react"
import { useNavigate } from "react-router-dom"
  
  // Dados de navegação e usuário
  const data = {
    user: {
      name: localStorage.getItem('name'),
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Clientes",
        url: "/clientes",
        icon: PersonStanding,
        isActive: true,
      },
      {
        title: "Caixa",
        url: "/caixa",
        icon: Calculator,
      },
      {
        title: "Produtos",
        url: "/produtos",
        icon: FeatherIcon,
      },
    ],
  }
  
export default function Page({ children }) {
    const { logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = async (event) => {
      event.preventDefault();
      try {
        logout();
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
      <SidebarProvider>
        <Sidebar variant="inset">
          <SidebarHeader>
            {/* Menu Superior com Avatar e Nome */}
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <a href="/dashboard">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src='./lion.webp' />
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Gestão 360</span>
                      <span className="truncate text-xs">Leão Ferragens</span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          
          {/* Sidebar com Navegação */}
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
  
          {/* Rodapé do Sidebar com Logout */}
          <SidebarFooter>
            <SidebarMenuItem>
              <Avatar className="h-8 w-8 rounded-lg" src={data.user.avatar}>
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <span className="flex-1 truncate font-semibold">{data.user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </SidebarMenuItem>
          </SidebarFooter>
        </Sidebar>
        
        {/* Área de conteúdo dinâmico com Breadcrumb e children */}
        <SidebarInset>
          <header className="flex h-16 items-center gap-2 px-4 bg-gray-100 shadow-sm">
            <SidebarTrigger />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Início</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Clientes</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          
          {/* Conteúdo dinâmico */}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }
  