// src/pages/Profile.tsx
"use client";

import type React from "react";
import { useEffect, useState, ChangeEvent } from "react";
import {
  ProfileContainer,
  ProfileContent,
  EventsGrid,
  SectionTitle,
  SectionHeader,
  ViewAllLink,
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
}

const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileErrorMsg, setProfileErrorMsg] = useState<string | null>(null);

  // Estados para upload do avatar (para o usuário logado nesta página)
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Mock data para eventos (substituir por fetch real no futuro)
  const createdEvents = [
    {
      id: "1",
      title: "Game Play",
      description: "Always a new challenge.",
      imageUrl: undefined,
      onlineCount: 18201,
      membersCount: 327453,
    },
    {
      id: "2",
      title: "Virtual Reality",
      description: "Great place for VR.",
      imageUrl: "/vr-image.jpg",
      onlineCount: 5678,
      membersCount: 245678,
    },
  ];
  const joinedEvents = [
    {
      id: "4",
      title: "3D Art",
      description: "A great place to discuss art.",
      imageUrl: undefined,
      onlineCount: 4532,
      membersCount: 345678,
    },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoadingProfile(true);
      setProfileErrorMsg(null);
      setUploadError(null);

      try {
        const {
          data: { user: loggedInUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !loggedInUser) {
          console.error("Usuário não autenticado:", authError?.message);
          setProfileErrorMsg("Você precisa estar logado para ver seu perfil.");
          setProfileData(null);
          setLoadingProfile(false);

          return;
        }

        const { data: userProfile, error: fetchProfileError } = await supabase
          .from("usuario")
          .select(
            "user_id, nome_usuario, email, primeiro_nome, sobrenome, foto_perfil, biografia, data_criacao, data_atualizacao"
          )
          .eq("user_id", loggedInUser.id)
          .single();

        if (fetchProfileError || !userProfile) {
          console.error(
            "Erro ao buscar perfil ou perfil não encontrado:",
            fetchProfileError?.message
          );
          setProfileErrorMsg(
            "Seu perfil não foi encontrado no banco de dados."
          );
          setProfileData(null);
          setLoadingProfile(false);
          return;
        }

        setProfileData(userProfile as UserProfile);
        setAvatarPreview(
          userProfile.foto_perfil || "/images/default-avatar.png"
        );
      } catch (error: any) {
        console.error("Erro inesperado ao buscar perfil:", error.message);
        setProfileErrorMsg("Ocorreu um erro ao carregar o perfil.");
        setProfileData(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validImageTypes.includes(file.type)) {
        setUploadError("Tipo de arquivo inválido. Use JPEG, PNG, GIF ou WEBP.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        setUploadError("Arquivo muito grande. O limite é de 5MB.");
        return;
      }
      setNewAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
      setUploadError(null);
    }
  };

  const handleAvatarUpload = async () => {
    if (!newAvatarFile || !profileData) {
      setUploadError(
        "Nenhuma nova imagem selecionada ou dados do perfil ausentes."
      );
      return;
    }
    setIsUploadingAvatar(true);
    setUploadError(null);
    try {
      const userId = profileData.user_id;
      const fileExt = newAvatarFile.name.split(".").pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadErrorResponse } = await supabase.storage
        .from("avatars")
        .upload(filePath, newAvatarFile, {
          cacheControl: "3600",
          upsert: false,
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
      alert("Foto de perfil atualizada com sucesso! 🎉");
    } catch (error: any) {
      const errorMessage =
        error.message ||
        error.error_description ||
        "Ocorreu um erro desconhecido.";
      setUploadError(`Erro ao atualizar foto: ${errorMessage}`);
      alert(`Erro ao atualizar foto: ${errorMessage}`);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const tabs = [
    {
      id: "created",
      label: "Eventos Criados",
      content: (
        <>
          {" "}
          <SectionHeader>
            {" "}
            <SectionTitle>Eventos Criados</SectionTitle>{" "}
            <ViewAllLink href="#">Ver todos</ViewAllLink>{" "}
          </SectionHeader>{" "}
          <EventsGrid>
            {" "}
            {createdEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}{" "}
          </EventsGrid>{" "}
        </>
      ),
    },
    {
      id: "joined",
      label: "Eventos Participando",
      content: (
        <>
          {" "}
          <SectionHeader>
            {" "}
            <SectionTitle>Eventos Participando</SectionTitle>{" "}
            <ViewAllLink href="#">Ver todos</ViewAllLink>{" "}
          </SectionHeader>{" "}
          <EventsGrid>
            {" "}
            {joinedEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}{" "}
          </EventsGrid>{" "}
        </>
      ),
    },
    {
      id: "about",
      label: "Sobre",
      content: (
        <div>
          {" "}
          <SectionTitle>Sobre Mim</SectionTitle>{" "}
          <p>
            {profileData?.biografia ||
              "Você ainda não adicionou uma biografia."}
          </p>{" "}
          <p>
            Membro desde:{" "}
            {profileData?.data_criacao
              ? new Date(profileData.data_criacao).toLocaleDateString("pt-BR")
              : "Data indisponível"}
          </p>{" "}
        </div>
      ),
    },
  ];

  if (loadingProfile) {
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
            Carregando seu perfil... ⏳
          </div>
        </ProfileContainer>
      </Container>
    );
  }

  if (profileErrorMsg || !profileData) {
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
            <h2>Erro ao carregar perfil 🙁</h2>
            <p>
              {profileErrorMsg ||
                "Não foi possível carregar os dados do seu perfil."}
            </p>
          </div>
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
        />
        <ProfileContent>
          <TabNavigation tabs={tabs} defaultTab="created" />
        </ProfileContent>
      </ProfileContainer>
    </Container>
  );
};

export default ProfilePage;
