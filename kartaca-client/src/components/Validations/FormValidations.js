import { object, string,ref} from 'yup';

export let SingUpValidations = object({
 firstName: string().min(3,'İsim kısmı 3 karakterden az olamaz').required('İsim kısmı boş bırakılamaz  '),
 lastName: string().min(3,'Soyisim kısmı 3 karakterden az olamaz').required('Soyisim kısmı boş bırakılamaz'),
  email: string().email('Geçerli bir e-mail giriniz.').required('Zorunlu alan'),
  password: string().min(6,'Parola en az 6 karakter olmalıdır.').required('Zorunlu alan'),
 passwordConfirm: string().oneOf([ref('password')],'Parolalar uyuşmamaktadır.').required('Zorunlu alan'),
 
});
 
export let LoginValidations = object({
  
   email: string().email('Geçerli bir e-mail giriniz.').required('Zorunlu alan'),
   password: string().min(6,'Parola en az 6 karakter olmalıdır.').required('Zorunlu alan'),
 
  
 });
 