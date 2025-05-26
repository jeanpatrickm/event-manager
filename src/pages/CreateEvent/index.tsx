"use client";

import type React from "react";
import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ImageIcon,
  Users,
  Info,
  Tag,
  X,
  User,
  Globe,
  Lock,
  Monitor,
  Map,
} from "lucide-react";
import {
  Container,
  FormContainer,
  Header,
  Title,
  FormSection,
  InputGroup,
  Label,
  Input,
  TextArea,
  Button,
  ButtonGroup,
  ImagePreviewContainer,
  ImagePreview,
  RemoveImageButton,
  TagsContainer,
  TagItem,
  TagInput,
  ErrorMessage,
  RadioGroup,
  RadioOption,
  RadioInput,
  RadioLabel,
} from "./styles";
import Sidebar from "../../components/CreateEvent/SideBar";
import TopBar from "../../components/CreateEvent/TopBar";
import { supabase } from "../../lib/supabase";

interface FormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: string;
  category: string;
  tags: string[];
  coverImage: File | null;
  organizerName: string;
  eventType: "public" | "private";
  eventMode: "online" | "in-person";
  onlinePlatform?: string;
  onlineLink?: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  organizerName?: string;
  onlineLink?: string;
}

const CreateEvent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
    category: "",
    tags: [],
    coverImage: null,
    organizerName: "",
    eventType: "public",
    eventMode: "in-person",
    onlinePlatform: "",
    onlineLink: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [currentTag, setCurrentTag] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRadioChange = (name: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, coverImage: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, coverImage: null }));
    setImagePreview(null);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, currentTag.trim()],
        }));
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória";
    }

    if (!formData.date) {
      newErrors.date = "Data é obrigatória";
    }

    if (!formData.time) {
      newErrors.time = "Horário é obrigatório";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Localização é obrigatória";
    }

    if (!formData.organizerName.trim()) {
      newErrors.organizerName = "Nome do organizador é obrigatório";
    }

    if (formData.eventMode === "online" && !formData.onlineLink?.trim()) {
      newErrors.onlineLink = "Link para o evento online é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // 1. Upload da imagem de capa (se existir)
      let imageUrl = null;

      if (formData.coverImage) {
        const fileExt = formData.coverImage.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `event_covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("event-images")
          .upload(filePath, formData.coverImage);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("event-images")
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      }

      // 2. Obter o ID do usuário logado
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Usuário não autenticado");

      // 3. Mapear categoria para cod_categoria (exemplo básico)
      const categoryMap: Record<string, number> = {
        game: 1,
        art: 2,
        nft: 3,
        vr: 4,
        other: 5,
      };

      // dados para inserção
      const eventData = {
        titulo: formData.title,
        descricao: formData.description,
        data_evento: formData.date,
        horario: `${formData.date}T${formData.time}:00`,
        local: formData.eventMode === "in-person" ? formData.location : null,
        publico: formData.eventType === "public",
        presencial: formData.eventMode === "in-person",
        max_participantes: formData.maxParticipants
          ? Number(formData.maxParticipants)
          : null,
        cod_categoria: formData.category
          ? categoryMap[formData.category]
          : null,
        categoria: formData.category || null,
        tags: formData.tags.length > 0 ? formData.tags.join(", ") : null,
        nome_organizador: formData.organizerName,
        image_capa: imageUrl,
        link_online:
          formData.eventMode === "online"
            ? formData.onlineLink || formData.onlinePlatform
            : null,
        user_id: user.id,
      };

      //  insert no Supabase
      const { data, error } = await supabase
        .from("eventos")
        .insert([eventData])
        .select();

      if (error) throw error;

      console.log("Evento criado com sucesso:", data);
      alert("Evento criado com sucesso!");

      // Limpar o formulário após sucesso
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        maxParticipants: "",
        category: "",
        tags: [],
        coverImage: null,
        organizerName: "",
        eventType: "public",
        eventMode: "in-person",
        onlinePlatform: "",
        onlineLink: "",
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      alert(`Erro ao criar evento: ${error.message}`);
    }
  };
  const handleCancel = () => {
    // Redirecionar para a página anterior ou home
    if (
      window.confirm(
        "Deseja cancelar a criação do evento? Todas as informações serão perdidas."
      )
    ) {
      // Redirecionamento aqui
      console.log("Cancelado");
    }
  };

  return (
    <Container>
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <FormContainer>
          <Header>
            <Title>Criar Novo Evento</Title>
          </Header>

          <form onSubmit={handleSubmit}>
            {/* Seção de Informações Básicas */}
            <FormSection>
              <InputGroup>
                <Label htmlFor="organizerName">
                  <User size={16} />
                  Nome do Organizador*
                </Label>
                <Input
                  id="organizerName"
                  name="organizerName"
                  value={formData.organizerName}
                  onChange={handleInputChange}
                  placeholder="Seu nome ou nome da organização"
                  hasError={!!errors.organizerName}
                />
                {errors.organizerName && (
                  <ErrorMessage>{errors.organizerName}</ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="title">
                  <Info size={16} />
                  Título do Evento*
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Digite o título do seu evento"
                  hasError={!!errors.title}
                />
                {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="description">
                  <Info size={16} />
                  Descrição*
                </Label>
                <TextArea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descreva seu evento"
                  rows={4}
                  hasError={!!errors.description}
                />
                {errors.description && (
                  <ErrorMessage>{errors.description}</ErrorMessage>
                )}
              </InputGroup>
            </FormSection>

            {/* Seção de Tipo e Modo do Evento */}
            <FormSection>
              <InputGroup>
                <Label>
                  <Globe size={16} />
                  Tipo de Evento
                </Label>
                <RadioGroup>
                  <RadioOption>
                    <RadioInput
                      type="radio"
                      id="public"
                      name="eventType"
                      checked={formData.eventType === "public"}
                      onChange={() => handleRadioChange("eventType", "public")}
                    />
                    <RadioLabel htmlFor="public">
                      <Globe size={14} /> Público
                    </RadioLabel>
                  </RadioOption>
                  <RadioOption>
                    <RadioInput
                      type="radio"
                      id="private"
                      name="eventType"
                      checked={formData.eventType === "private"}
                      onChange={() => handleRadioChange("eventType", "private")}
                    />
                    <RadioLabel htmlFor="private">
                      <Lock size={14} /> Privado
                    </RadioLabel>
                  </RadioOption>
                </RadioGroup>
              </InputGroup>

              <InputGroup>
                <Label>
                  <Monitor size={16} />
                  Modalidade do Evento
                </Label>
                <RadioGroup>
                  <RadioOption>
                    <RadioInput
                      type="radio"
                      id="online"
                      name="eventMode"
                      checked={formData.eventMode === "online"}
                      onChange={() => handleRadioChange("eventMode", "online")}
                    />
                    <RadioLabel htmlFor="online">
                      <Monitor size={14} /> Online
                    </RadioLabel>
                  </RadioOption>
                  <RadioOption>
                    <RadioInput
                      type="radio"
                      id="in-person"
                      name="eventMode"
                      checked={formData.eventMode === "in-person"}
                      onChange={() =>
                        handleRadioChange("eventMode", "in-person")
                      }
                    />
                    <RadioLabel htmlFor="in-person">
                      <Map size={14} /> Presencial
                    </RadioLabel>
                  </RadioOption>
                </RadioGroup>

                {/* Campos condicionais para eventos online */}
                {formData.eventMode === "online" && (
                  <>
                    <Input
                      as="select"
                      name="onlinePlatform"
                      value={formData.onlinePlatform}
                      onChange={handleInputChange}
                      style={{ marginTop: "12px" }}
                    >
                      <option value="">Selecione a plataforma</option>
                      <option value="discord">Discord</option>
                      <option value="zoom">Zoom</option>
                      <option value="teams">Microsoft Teams</option>
                      <option value="skype">Skype</option>
                      <option value="google-meet">Google Meet</option>
                      <option value="other">Outra plataforma</option>
                    </Input>

                    <Input
                      name="onlineLink"
                      value={formData.onlineLink || ""}
                      onChange={handleInputChange}
                      placeholder="Link para participar do evento"
                      style={{ marginTop: "12px" }}
                      hasError={!!errors.onlineLink}
                    />
                    {errors.onlineLink && (
                      <ErrorMessage>{errors.onlineLink}</ErrorMessage>
                    )}
                  </>
                )}
              </InputGroup>
            </FormSection>

            {/* Seção de Data e Localização */}
            <FormSection>
              <InputGroup>
                <Label htmlFor="date">
                  <Calendar size={16} />
                  Data*
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  hasError={!!errors.date}
                />
                {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="time">
                  <Clock size={16} />
                  Horário*
                </Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  hasError={!!errors.time}
                />
                {errors.time && <ErrorMessage>{errors.time}</ErrorMessage>}
              </InputGroup>

              {formData.eventMode === "in-person" && (
                <InputGroup>
                  <Label htmlFor="location">
                    <MapPin size={16} />
                    Localização*
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Onde o evento acontecerá?"
                    hasError={!!errors.location}
                  />
                  {errors.location && (
                    <ErrorMessage>{errors.location}</ErrorMessage>
                  )}
                </InputGroup>
              )}
            </FormSection>

            {/* Seção de Configurações Adicionais */}
            <FormSection>
              <InputGroup>
                <Label htmlFor="maxParticipants">
                  <Users size={16} />
                  Número Máximo de Participantes
                </Label>
                <Input
                  id="maxParticipants"
                  name="maxParticipants"
                  type="number"
                  min="1"
                  value={formData.maxParticipants}
                  onChange={handleInputChange}
                  placeholder="Deixe em branco para ilimitado"
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="category">
                  <Tag size={16} />
                  Categoria
                </Label>
                <Input
                  as="select"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="game">Game Play</option>
                  <option value="art">3D Art</option>
                  <option value="nft">NFT</option>
                  <option value="vr">Virtual Reality</option>
                  <option value="other">Outro</option>
                </Input>
              </InputGroup>

              <InputGroup>
                <Label>
                  <Tag size={16} />
                  Tags
                </Label>
                <TagInput
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Digite tags e pressione Enter"
                />
                <TagsContainer>
                  {formData.tags.map((tag, index) => (
                    <TagItem key={index}>
                      {tag}
                      <X size={14} onClick={() => removeTag(tag)} />
                    </TagItem>
                  ))}
                </TagsContainer>
              </InputGroup>
            </FormSection>

            {/* Seção de Imagem de Capa */}
            <FormSection>
              <InputGroup>
                <Label htmlFor="coverImage">
                  <ImageIcon size={16} />
                  Imagem de Capa
                </Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: imagePreview ? "none" : "block" }}
                />

                {imagePreview && (
                  <ImagePreviewContainer>
                    <ImagePreview
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                    />
                    <RemoveImageButton onClick={removeImage}>
                      <X size={16} />
                    </RemoveImageButton>
                  </ImagePreviewContainer>
                )}
              </InputGroup>
            </FormSection>

            <ButtonGroup>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Criar Evento
              </Button>
            </ButtonGroup>
          </form>
        </FormContainer>
      </div>
    </Container>
  );
};

export default CreateEvent;
