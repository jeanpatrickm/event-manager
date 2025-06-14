"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  ImageIcon,
  Users,
  Info,
  Tag,
  X,
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
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const isEditMode = !!eventId;

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
    onlineLink: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [currentTag, setCurrentTag] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (isEditMode) {
      const fetchEventData = async () => {
        setIsLoadingData(true);
        const { data: eventToEdit, error } = await supabase
          .from("eventos")
          .select("*")
          .eq("evento_id", eventId)
          .single();

        if (error || !eventToEdit) {
          console.error("Erro ao buscar evento para edição:", error);
          alert("Não foi possível carregar os dados do evento para edição.");
          navigate("/");
          return;
        }

        setFormData({
          title: eventToEdit.titulo || "",
          description: eventToEdit.descricao || "",
          date: eventToEdit.data_evento
            ? new Date(eventToEdit.data_evento).toISOString().split("T")[0]
            : "",
          time: eventToEdit.horario
            ? new Date(eventToEdit.horario).toTimeString().substring(0, 5)
            : "",
          location: eventToEdit.local || "",
          maxParticipants: eventToEdit.max_participantes?.toString() || "",
          category: eventToEdit.categoria || "",
          tags: eventToEdit.tags
            ? eventToEdit.tags.split(",").map((t) => t.trim())
            : [],
          coverImage: null,
          organizerName: eventToEdit.nome_organizador || "",
          eventType: eventToEdit.publico ? "public" : "private",
          eventMode: eventToEdit.presencial ? "in-person" : "online",
          onlineLink: eventToEdit.link_online || "",
        });
        setImagePreview(eventToEdit.image_capa);
        setIsLoadingData(false);
      };
      fetchEventData();
    } else {
      setIsLoadingData(false);
    }
  }, [eventId, navigate, isEditMode]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRadioChange = (name: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "eventMode") {
      setErrors((prev) => ({
        ...prev,
        location: undefined,
        onlineLink: undefined,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, coverImage: file }));
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
    const fileInput = document.getElementById("coverImage") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      e.preventDefault();
      if (
        !formData.tags.includes(currentTag.trim()) &&
        formData.tags.length < 5
      ) {
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!formData.date) {
      newErrors.date = "Data é obrigatória";
    } else {
      const eventDateObj = new Date(formData.date + "T00:00:00");
      if (isNaN(eventDateObj.getTime())) {
        newErrors.date = "Formato de data inválido.";
      } else if (eventDateObj < today && !isEditMode) {
        newErrors.date = "Data não pode ser no passado.";
      }
    }
    if (!formData.time) {
      newErrors.time = "Horário é obrigatório";
    }
    if (formData.eventMode === "in-person" && !formData.location.trim()) {
      newErrors.location = "Localização é obrigatória para eventos presenciais";
    }
    if (formData.eventMode === "online") {
      const trimmedOnlineLink = formData.onlineLink?.trim();
      if (!trimmedOnlineLink) {
        newErrors.onlineLink = "Link para o evento online é obrigatório";
      } else if (!/^https?:\/\/.+/.test(trimmedOnlineLink)) {
        newErrors.onlineLink =
          "Link do evento online inválido. Deve começar com http:// ou https://";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Por favor, corrija os erros no formulário.");
      return;
    }
    setIsSubmitting(true);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      alert("Usuário não autenticado. Por favor, faça login.");
      setIsSubmitting(false);
      return;
    }

    try {
      let imageUrl: string | undefined = undefined;
      if (formData.coverImage) {
        const fileExt = formData.coverImage.name.split(".").pop();
        const fileName = `cover_${user.id}_${Date.now()}.${fileExt}`;
        const filePath = `event_covers/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from("event-images")
          .upload(filePath, formData.coverImage, { upsert: true });
        if (uploadError) throw uploadError;
        imageUrl = supabase.storage.from("event-images").getPublicUrl(filePath)
          .data.publicUrl;
      }

      const categoryMap: Record<string, number> = {
        game: 1,
        art: 2,
        nft: 3,
        vr: 4,
        other: 5,
      };

      const eventDataPayload = {
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
          ? categoryMap[formData.category.toLowerCase()]
          : null,
        categoria: formData.category || null,
        tags: formData.tags.length > 0 ? formData.tags.join(", ") : null,
        nome_organizador: formData.organizerName,
        link_online:
          formData.eventMode === "online" && formData.onlineLink?.trim()
            ? formData.onlineLink
            : null,
        ...(imageUrl && { image_capa: imageUrl }),
      };

      if (isEditMode) {
        const { error: updateError } = await supabase
          .from("eventos")
          .update(eventDataPayload)
          .eq("evento_id", eventId);
        if (updateError) throw updateError;
        alert("Evento atualizado com sucesso!");
        navigate(`/event-details/${eventId}`);
      } else {
        const { data: novoEvento, error: insertError } = await supabase
          .from("eventos")
          .insert([{ ...eventDataPayload, user_id: user.id }])
          .select()
          .single();
        if (insertError) throw insertError;
        if (!novoEvento) throw new Error("Falha ao criar o evento.");

        const { error: erroInscricao } = await supabase
          .from("inscricao")
          .insert([{ evento_id: novoEvento.evento_id, user_id: user.id }]);
        if (erroInscricao) {
          console.error("FALHA ao inscrever organizador:", erroInscricao);
          alert(
            "Evento criado, mas houve um erro ao te inscrever automaticamente."
          );
        } else {
          alert("Evento criado e você foi inscrito automaticamente!");
        }
        navigate(`/event-details/${novoEvento.evento_id}`);
      }
    } catch (error: any) {
      console.error("Erro no processo de submissão:", error);
      alert(`Erro: ${error.message || String(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    const confirmationMessage = isEditMode
      ? "Deseja cancelar a edição? Todas as alterações não salvas serão perdidas."
      : "Deseja cancelar a criação do evento? Todas as informações não salvas serão perdidas.";

    if (window.confirm(confirmationMessage)) {
      navigate(isEditMode ? `/event-details/${eventId}` : "/");
    }
  };

  if (isLoadingData) {
    return (
      <Container>
        <Sidebar activeItem="Criar Evento" />
        <div className="main-content">
          <TopBar />
          <FormContainer>Carregando dados do evento...</FormContainer>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Sidebar activeItem="Criar Evento" />
      <div className="main-content">
        <TopBar />
        <FormContainer>
          <Header>
            <Title>{isEditMode ? "Editar Evento" : "Criar Novo Evento"}</Title>
          </Header>

          <form onSubmit={handleSubmit}>
            <FormSection>
              <InputGroup>
                <Label htmlFor="title">
                  <Info size={16} /> Título do Evento*
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Digite o título do seu evento"
                  hasError={!!errors.title}
                  disabled={isSubmitting}
                />
                {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
              </InputGroup>
            </FormSection>
            <FormSection>
              <InputGroup>
                <Label htmlFor="description">
                  <Info size={16} /> Descrição*
                </Label>
                <TextArea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descreva os detalhes do seu evento..."
                  rows={5}
                  hasError={!!errors.description}
                  disabled={isSubmitting}
                />
                {errors.description && (
                  <ErrorMessage>{errors.description}</ErrorMessage>
                )}
              </InputGroup>
            </FormSection>
            <FormSection>
              <InputGroup>
                <Label>
                  <Globe size={16} /> Tipo de Evento
                </Label>
                <RadioGroup>
                  <RadioOption>
                    <RadioInput
                      type="radio"
                      id="public"
                      name="eventType"
                      checked={formData.eventType === "public"}
                      onChange={() => handleRadioChange("eventType", "public")}
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    />
                    <RadioLabel htmlFor="private">
                      <Lock size={14} /> Privado
                    </RadioLabel>
                  </RadioOption>
                </RadioGroup>
              </InputGroup>
              <InputGroup>
                <Label>
                  <Monitor size={16} /> Modalidade do Evento
                </Label>
                <RadioGroup>
                  <RadioOption>
                    <RadioInput
                      type="radio"
                      id="online"
                      name="eventMode"
                      checked={formData.eventMode === "online"}
                      onChange={() => handleRadioChange("eventMode", "online")}
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    />
                    <RadioLabel htmlFor="in-person">
                      <Map size={14} /> Presencial
                    </RadioLabel>
                  </RadioOption>
                </RadioGroup>
                {formData.eventMode === "online" && (
                  <InputGroup style={{ marginTop: "16px" }}>
                    <Label htmlFor="onlineLink">
                      <Monitor size={16} /> Link do Evento Online*
                    </Label>
                    <Input
                      id="onlineLink"
                      name="onlineLink"
                      value={formData.onlineLink || ""}
                      onChange={handleInputChange}
                      placeholder="Insira o link para participar (ex.: Zoom, Discord)"
                      hasError={!!errors.onlineLink}
                      disabled={isSubmitting}
                    />
                    {errors.onlineLink && (
                      <ErrorMessage>{errors.onlineLink}</ErrorMessage>
                    )}
                  </InputGroup>
                )}
              </InputGroup>
            </FormSection>
            <FormSection>
              <InputGroup>
                <Label htmlFor="date">
                  <Calendar size={16} /> Data*
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  hasError={!!errors.date}
                  disabled={isSubmitting}
                />
                {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
              </InputGroup>
              <InputGroup>
                <Label htmlFor="time">
                  <Clock size={16} /> Horário*
                </Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  hasError={!!errors.time}
                  disabled={isSubmitting}
                />
                {errors.time && <ErrorMessage>{errors.time}</ErrorMessage>}
              </InputGroup>
              {formData.eventMode === "in-person" && (
                <InputGroup>
                  <Label htmlFor="location">
                    <MapPin size={16} /> Localização*
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Onde o evento acontecerá?"
                    hasError={!!errors.location}
                    disabled={isSubmitting}
                  />
                  {errors.location && (
                    <ErrorMessage>{errors.location}</ErrorMessage>
                  )}
                </InputGroup>
              )}
            </FormSection>
            <FormSection>
              <InputGroup>
                <Label htmlFor="maxParticipants">
                  <Users size={16} /> Número Máximo de Participantes
                </Label>
                <Input
                  id="maxParticipants"
                  name="maxParticipants"
                  type="number"
                  min="1"
                  value={formData.maxParticipants}
                  onChange={handleInputChange}
                  placeholder="Deixe em branco para ilimitado"
                  disabled={isSubmitting}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="category">
                  <Tag size={16} /> Categoria
                </Label>
                <Input
                  as="select"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
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
                  <Tag size={16} /> Tags{" "}
                  <small>(Máx. 5, pressione Enter)</small>
                </Label>
                <TagInput
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Digite e pressione Enter"
                  disabled={isSubmitting || formData.tags.length >= 5}
                />
                <TagsContainer>
                  {formData.tags.map((tag, index) => (
                    <TagItem key={index}>
                      {tag}
                      {!isSubmitting && (
                        <X
                          size={14}
                          onClick={() => removeTag(tag)}
                          style={{ cursor: "pointer", marginLeft: "4px" }}
                        />
                      )}
                    </TagItem>
                  ))}
                </TagsContainer>
              </InputGroup>
            </FormSection>
            <FormSection>
              <InputGroup>
                <Label htmlFor="coverImage">
                  <ImageIcon size={16} /> Imagem de Capa
                </Label>
                {!imagePreview && (
                  <Input
                    id="coverImage"
                    name="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isSubmitting}
                  />
                )}
                {imagePreview && (
                  <ImagePreviewContainer>
                    <ImagePreview src={imagePreview} alt="Preview da capa" />
                    {!isSubmitting && (
                      <RemoveImageButton type="button" onClick={removeImage}>
                        <X size={16} /> Remover Imagem
                      </RemoveImageButton>
                    )}
                  </ImagePreviewContainer>
                )}
              </InputGroup>
            </FormSection>
            <ButtonGroup>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting
                  ? isEditMode
                    ? "Salvando..."
                    : "Criando..."
                  : isEditMode
                  ? "Salvar Alterações"
                  : "Criar Evento"}
              </Button>
            </ButtonGroup>
          </form>
        </FormContainer>
      </div>
    </Container>
  );
};

export default CreateEvent;
