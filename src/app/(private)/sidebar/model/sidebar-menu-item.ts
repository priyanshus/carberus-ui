export interface MenuItem {
  id: string;          
  displayText: string;        
  href: string;        
  icon?: React.ReactNode; 
  isHeader: boolean
  subMenu?: SubMenuItem[]
}


export interface SubMenuItem {
  id: string;          
  displayText: string;        
  href: string;        
}