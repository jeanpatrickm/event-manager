"use client";

import type React from "react";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ProfileContainer,
  ProfileContent,
  EventsGrid,
  SectionTitle,
  SectionHeader,
  EditForm,
  FormGroup,
  FormInput,
  FormTextArea,
  SubmitButton,
} from "./styles";
import ProfileHeader from "../../components/Perfil/ProfileHeader";
import EventCard from "../../components/Perfil/EventCard";
import TabNavigation from "../../components/Perfil/TabNavigation";
import { Container } from "../Home/styles";
import Sidebar from "../../components/CreateEvent/SideBar";
import { supabase } from "../../lib/supabase";

interface UserProfile {
  user_id: string;
  nome_usuario: string;
  email?: string;
  primeiro_nome?: string | null;
  sobrenome?: string | null;
  foto_perfil: string | null;
  biografia?: string | null;
  data_criacao?: string;
  data_atualizacao?: string;
  instagram_link?: string | null;
  linkedin_link?: string | null;
}
interface ProfileEvent {
  evento_id: string;
  titulo: string;
  descricao: string | null;
  image_capa: string | null;
  max_participantes: number | null;
}
interface EditProfileFormData {
  primeiro_nome: string;
  sobrenome: string;
  nome_usuario: string;
  biografia: string;
  instagram_link: string;
  linkedin_link: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileErrorMsg, setProfileErrorMsg] = useState<string | null>(null);

  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [createdEvents, setCreatedEvents] = useState<ProfileEvent[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<ProfileEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsErrorMsg, setEventsErrorMsg] = useState<string | null>(null);

  const [editFormData, setEditFormData] = useState<EditProfileFormData>({
    primeiro_nome: "",
    sobrenome: "",
    nome_usuario: "",
    biografia: "",
    instagram_link: "",
    linkedin_link: "",
  });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [updateProfileError, setUpdateProfileError] = useState<string | null>(
    null
  );

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoadingProfile(true);
      setLoadingEvents(true);
      setProfileErrorMsg(null);
      setEventsErrorMsg(null);
      setUploadError(null);

      try {
        const {
          data: { user: loggedInUser },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError || !loggedInUser) {
          console.error("Usuário não autenticado:", authError?.message);
          setProfileErrorMsg("Você precisa estar logado para ver esta página.");
          setProfileData(null);
          setLoadingProfile(false);
          setLoadingEvents(false);
          return;
        }

        const { data: userProfile, error: fetchProfileError } = await supabase
          .from("usuario")
          .select(
            "user_id, nome_usuario, email, primeiro_nome, sobrenome, foto_perfil, biografia, data_criacao, data_atualizacao, instagram_link, linkedin_link"
          )
          .eq("user_id", loggedInUser.id)
          .single();

        if (fetchProfileError && fetchProfileError.code !== "PGRST116") {
          throw fetchProfileError;
        }

        const profileToUse = userProfile || {
          user_id: loggedInUser.id,
          nome_usuario: loggedInUser.email?.split("@")[0] || "novo_usuario",
          email: loggedInUser.email,
          primeiro_nome: "",
          sobrenome: "",
          foto_perfil: null,
          biografia: "",
          instagram_link: "",
          linkedin_link: "",
        };

        setProfileData(profileToUse as UserProfile);
        setEditFormData({
          primeiro_nome: profileToUse.primeiro_nome || "",
          sobrenome: profileToUse.sobrenome || "",
          nome_usuario: profileToUse.nome_usuario || "",
          biografia: profileToUse.biografia || "",
          instagram_link: profileToUse.instagram_link || "",
          linkedin_link: profileToUse.linkedin_link || "",
        });
        setAvatarPreview(
          profileToUse.foto_perfil || "/images/default-avatar.png"
        );
        setLoadingProfile(false);

        const [createdRes, inscriptionsRes] = await Promise.all([
          supabase
            .from("eventos")
            .select(
              "evento_id, titulo, descricao, image_capa, max_participantes"
            )
            .eq("user_id", loggedInUser.id)
            .order("data_criacao", { ascending: false }),
          supabase
            .from("inscricao")
            .select("evento_id")
            .eq("user_id", loggedInUser.id),
        ]);

        if (createdRes.error) {
          throw createdRes.error;
        }
        setCreatedEvents(createdRes.data || []);

        if (inscriptionsRes.error) {
          throw inscriptionsRes.error;
        }
        if (inscriptionsRes.data && inscriptionsRes.data.length > 0) {
          const eventIdsToFetch = inscriptionsRes.data.map(
            (insc) => insc.evento_id
          );
          const { data: joinedEventsData, error: joinedEventsError } =
            await supabase
              .from("eventos")
              .select(
                "evento_id, titulo, descricao, image_capa, max_participantes"
              )
              .in("evento_id", eventIdsToFetch)
              .order("data_evento", { ascending: true });
          if (joinedEventsError) {
            throw joinedEventsError;
          }
          setJoinedEvents(joinedEventsData || []);
        } else {
          setJoinedEvents([]);
        }
      } catch (error: any) {
        console.error("Erro ao carregar dados da página de perfil:", error);
        setProfileErrorMsg("Ocorreu um erro ao carregar o perfil.");
        setEventsErrorMsg("Ocorreu um erro ao carregar os eventos.");
      } finally {
        setLoadingProfile(false);
        setLoadingEvents(false);
      }
    };
    fetchAllData();
  }, []);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
      setUploadError(null);
    }
  };

  const handleAvatarUpload = async () => {
    if (!newAvatarFile || !profileData) {
      return;
    }
    setIsUploadingAvatar(true);
    setUploadError(null);
    try {
      const userId = profileData.user_id;
      const fileExt = newAvatarFile.name.split(".").pop();
      const fileName = `avatar_${userId}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      const { error: uploadErrorResponse } = await supabase.storage
        .from("avatars")
        .upload(filePath, newAvatarFile, {
          cacheControl: "3600",
          upsert: true,
        });
      if (uploadErrorResponse) throw uploadErrorResponse;
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      if (!urlData?.publicUrl)
        throw new Error("Não foi possível obter a URL pública.");
      const newAvatarUrl = urlData.publicUrl;
      const { error: updateError } = await supabase
        .from("usuario")
        .update({
          foto_perfil: newAvatarUrl,
          data_atualizacao: new Date().toISOString(),
        })
        .eq("user_id", userId);
      if (updateError) throw updateError;
      setProfileData((prev) =>
        prev
          ? {
              ...prev,
              foto_perfil: newAvatarUrl,
              data_atualizacao: new Date().toISOString(),
            }
          : null
      );
      setAvatarPreview(newAvatarUrl);
      setNewAvatarFile(null);
      alert("Foto de perfil atualizada!");
    } catch (error: any) {
      setUploadError(`Erro ao atualizar foto: ${error.message}`);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleProfileInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
    if (updateProfileError) setUpdateProfileError(null);
  };

  const handleProfileUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profileData) return;
    setIsUpdatingProfile(true);
    setUpdateProfileError(null);

    // ... (lógica de validação e update continua a mesma) ...
    if (!editFormData.nome_usuario.trim()) {
      setUpdateProfileError("Nome de usuário é obrigatório.");
      setIsUpdatingProfile(false);
      return;
    }

    try {
      const updates = {
        primeiro_nome: editFormData.primeiro_nome.trim() || null,
        sobrenome: editFormData.sobrenome.trim() || null,
        nome_usuario: editFormData.nome_usuario.trim(),
        biografia: editFormData.biografia.trim() || null,
        instagram_link: editFormData.instagram_link.trim() || null,
        linkedin_link: editFormData.linkedin_link.trim() || null,
        data_atualizacao: new Date().toISOString(),
      };
      const { error } = await supabase
        .from("usuario")
        .update(updates)
        .eq("user_id", profileData.user_id);
      if (error) throw error;
      setProfileData((prev) => (prev ? { ...prev, ...updates } : null));
      alert("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error: any) {
      const message = error.message;
      if (
        message.includes("violates unique constraint") &&
        message.includes("nome_usuario")
      ) {
        setUpdateProfileError(
          "Este nome de usuário já está em uso. Por favor, escolha outro."
        );
      } else {
        setUpdateProfileError(message);
      }
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const tabs = [
    {
      id: "created",
      //...
      label: `Eventos Criados (${createdEvents.length})`,
      content: (
        <>
          <SectionHeader>
            <SectionTitle>Eventos Criados</SectionTitle>
          </SectionHeader>
          {loadingEvents ? (
            <p>Carregando...</p>
          ) : createdEvents.length === 0 ? (
            <p>Nenhum evento criado.</p>
          ) : (
            <EventsGrid>
              {createdEvents.map((event) => (
                <Link
                  key={event.evento_id}
                  to={`/event-details/${event.evento_id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <EventCard
                    id={event.evento_id}
                    title={event.titulo}
                    description={event.descricao || ""}
                    imageUrl={
                      event.image_capa ||
                      "/placeholder.svg?height=200&width=300"
                    }
                  />
                </Link>
              ))}
            </EventsGrid>
          )}
        </>
      ),
    },
    {
      id: "joined",
      //...
      label: `Eventos Participando (${joinedEvents.length})`,
      content: (
        <>
          <SectionHeader>
            <SectionTitle>Eventos Participando</SectionTitle>
          </SectionHeader>
          {loadingEvents ? (
            <p>Carregando...</p>
          ) : joinedEvents.length === 0 ? (
            <p>Você não participa de eventos.</p>
          ) : (
            <EventsGrid>
              {joinedEvents.map((event) => (
                <Link
                  key={event.evento_id}
                  to={`/event-details/${event.evento_id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <EventCard
                    id={event.evento_id}
                    title={event.titulo}
                    description={event.descricao || ""}
                    imageUrl={
                      event.image_capa ||
                      "/placeholder.svg?height=200&width=300"
                    }
                  />
                </Link>
              ))}
            </EventsGrid>
          )}
        </>
      ),
    },
    {
      id: "about",
      label: "Sobre",
      content: (
        <div>
          <SectionTitle>Sobre Mim</SectionTitle>
          <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {profileData?.biografia ||
              "Você ainda não adicionou uma biografia."}
          </p>
          <p
            style={{
              marginTop: "20px",
              fontSize: "0.9em",
              color: "var(--user-tag-span)",
            }}
          >
            Membro desde:{" "}
            {profileData?.data_criacao
              ? new Date(profileData.data_criacao).toLocaleDateString("pt-BR")
              : "Data indisponível"}
          </p>
        </div>
      ),
    },
  ];

  if (loadingProfile && !profileData) {
    return (
      <Container>
        <Sidebar />
        <ProfileContainer>
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              color: "var(--white)",
            }}
          >
            Carregando...
          </div>
        </ProfileContainer>
      </Container>
    );
  }
  if (profileErrorMsg && !profileData) {
    return (
      <Container>
        <Sidebar />
        <ProfileContainer>
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              color: "var(--white)",
            }}
          >
            <h2>Erro</h2>
            <p>{profileErrorMsg}</p>
          </div>
        </ProfileContainer>
      </Container>
    );
  }
  if (!profileData) {
    return (
      <Container>
        <Sidebar />
        <ProfileContainer>
          <p>Não foi possível carregar o perfil.</p>
        </ProfileContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Sidebar />
      <ProfileContainer>
        <ProfileHeader
          username={profileData.nome_usuario}
          displayName={
            `${profileData.primeiro_nome || ""} ${
              profileData.sobrenome || ""
            }`.trim() || profileData.nome_usuario
          }
          avatarUrl={avatarPreview || "/images/default-avatar.png"}
          bannerUrl={undefined}
          events={createdEvents.length}
          onAvatarChange={handleAvatarChange}
          onAvatarUpload={handleAvatarUpload}
          newAvatarSelected={!!newAvatarFile}
          isUploadingAvatar={isUploadingAvatar}
          uploadError={uploadError}
          instagramLink={profileData.instagram_link}
          linkedinLink={profileData.linkedin_link}
          onEditClick={() => setIsEditing(true)}
        />

        {isEditing ? (
          <ProfileContent>
            <EditForm onSubmit={handleProfileUpdateSubmit}>
              <SectionTitle style={{ marginBottom: "20px" }}>
                Editar Informações do Perfil
              </SectionTitle>
              <FormGroup>
                <label htmlFor="primeiro_nome">Primeiro Nome:</label>
                <FormInput
                  type="text"
                  id="primeiro_nome"
                  name="primeiro_nome"
                  value={editFormData.primeiro_nome}
                  onChange={handleProfileInputChange}
                  disabled={isUpdatingProfile}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="sobrenome">Sobrenome:</label>
                <FormInput
                  type="text"
                  id="sobrenome"
                  name="sobrenome"
                  value={editFormData.sobrenome}
                  onChange={handleProfileInputChange}
                  disabled={isUpdatingProfile}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="nome_usuario">Nome de Usuário*:</label>
                <FormInput
                  type="text"
                  id="nome_usuario"
                  name="nome_usuario"
                  value={editFormData.nome_usuario}
                  onChange={handleProfileInputChange}
                  disabled={isUpdatingProfile}
                  required
                />
                <small>Este nome é único e usado para @.</small>
              </FormGroup>
              <FormGroup>
                <label htmlFor="biografia">Biografia:</label>
                <FormTextArea
                  id="biografia"
                  name="biografia"
                  value={editFormData.biografia}
                  onChange={handleProfileInputChange}
                  rows={4}
                  disabled={isUpdatingProfile}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="instagram_link">Link do Instagram:</label>
                <FormInput
                  type="url"
                  id="instagram_link"
                  name="instagram_link"
                  value={editFormData.instagram_link}
                  onChange={handleProfileInputChange}
                  placeholder="https://instagram.com/seuusuario"
                  disabled={isUpdatingProfile}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="linkedin_link">Link do LinkedIn:</label>
                <FormInput
                  type="url"
                  id="linkedin_link"
                  name="linkedin_link"
                  value={editFormData.linkedin_link}
                  onChange={handleProfileInputChange}
                  placeholder="https://linkedin.com/in/seuusuario"
                  disabled={isUpdatingProfile}
                />
              </FormGroup>
              {updateProfileError && (
                <p
                  style={{
                    color: "var(--cor-erro, red)",
                    marginBottom: "10px",
                  }}
                >
                  {updateProfileError}
                </p>
              )}
              <div style={{ display: "flex", gap: "10px" }}>
                <SubmitButton type="submit" disabled={isUpdatingProfile}>
                  {isUpdatingProfile ? "Salvando..." : "Salvar Alterações"}
                </SubmitButton>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{
                    padding: "10px 20px",
                    background: "var(--color-dark-grey-text)",
                    border: "none",
                    color: "white",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
              </div>
            </EditForm>
          </ProfileContent>
        ) : (
          <ProfileContent>
            <TabNavigation tabs={tabs} defaultTab={"created"} />
          </ProfileContent>
        )}
      </ProfileContainer>
    </Container>
  );
};

export default ProfilePage;
