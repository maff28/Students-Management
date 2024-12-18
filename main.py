# main.py

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import List

# Configuración de conexión a MySQL en XAMPP (usuario: root, sin contraseña)
DATABASE_URL = "mysql+mysqlconnector://root:@localhost/estudiantes_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Definir el modelo de datos en SQLAlchemy
class EstudianteDB(Base):
    __tablename__ = "estudiantes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    email = Column(String(100), unique=True, index=True)
    registrationDate = Column(String(20))

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Definir el modelo Pydantic para validación de datos
class Estudiante(BaseModel):
    id: int | None = None
    name: str
    email: str
    registrationDate: str

    class Config:
        orm_mode = True

# Inicializar la aplicación FastAPI
app = FastAPI()

# Configuración de CORS para permitir solicitudes desde http://localhost:4200 (Angular)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Permitir solicitudes desde el frontend Angular
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Dependencia de la sesión de BD
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Rutas para el CRUD de estudiantes
@app.get("/estudiantes", response_model=List[Estudiante])
def leer_estudiantes(db: Session = Depends(get_db)):
    return db.query(EstudianteDB).all()

@app.get("/estudiantes/{estudiante_id}", response_model=Estudiante)
def leer_estudiante(estudiante_id: int, db: Session = Depends(get_db)):
    estudiante = db.query(EstudianteDB).filter(EstudianteDB.id == estudiante_id).first()
    if not estudiante:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")
    return estudiante

@app.post("/estudiantes", response_model=Estudiante)
def crear_estudiante(estudiante: Estudiante, db: Session = Depends(get_db)):
    db_estudiante = EstudianteDB(**estudiante.dict())
    db.add(db_estudiante)
    db.commit()
    db.refresh(db_estudiante)
    return db_estudiante

@app.put("/estudiantes/{estudiante_id}", response_model=Estudiante)
def actualizar_estudiante(estudiante_id: int, estudiante: Estudiante, db: Session = Depends(get_db)):
    db_estudiante = db.query(EstudianteDB).filter(EstudianteDB.id == estudiante_id).first()
    if not db_estudiante:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")
    for key, value in estudiante.dict(exclude_unset=True).items():
        setattr(db_estudiante, key, value)
    db.commit()
    db.refresh(db_estudiante)
    return db_estudiante

@app.delete("/estudiantes/{estudiante_id}", response_model=dict)
def eliminar_estudiante(estudiante_id: int, db: Session = Depends(get_db)):
    db_estudiante = db.query(EstudianteDB).filter(EstudianteDB.id == estudiante_id).first()
    if not db_estudiante:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")
    db.delete(db_estudiante)
    db.commit()
    return {"message": "Estudiante eliminado correctamente"}
