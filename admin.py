from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def generar_hash_contraseña(contraseña: str) -> str:
    return pwd_context.hash(contraseña)


if __name__ == "__main__":
    contraseña = "admin123"
    hash_generado = generar_hash_contraseña(contraseña)
    print(f"Hash para '{contraseña}':\n{hash_generado}")
