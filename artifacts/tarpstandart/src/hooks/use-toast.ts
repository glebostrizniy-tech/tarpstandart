import { toast as sonnerToast } from "sonner"

export const toast = (props: { title: string; description?: string }) => {
  sonnerToast(props.title, {
    description: props.description,
  })
}

export const useToast = () => {
  return { toast }
}
