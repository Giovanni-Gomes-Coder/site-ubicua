import { useQuery } from "react-query";
import api from "../../services/api";

// interface sections One, Two, Three, For and Five
export interface FindSectionOneProps {
  id: string;
  title: string;
  description_one?: string;
  image_one?: string;
  created_at: string;
  updated_at: string;
}
export interface FindSectionTwoProps {
  id: string;
  title: string;
  description_one?: string;
  image_one?: string;
  created_at: string;
  updated_at: string;
}
export interface FindSectionThreeProps {
  id: string;
  title: string;
  description_one?: string;
  image_one?: string;
  created_at: string;
  updated_at: string;
}
export interface FindSectionForProps {
  id: string;
  title: string;
  description_one?: string;
  image_one?: string;
  created_at: string;
  updated_at: string;
}
export interface FindSectionFiveProps {
  id: string;
  title: string;
  description_one?: string;
  image_one?: string;
  created_at: string;
  updated_at: string;
}

// get response from sections
interface GetProjectResponse {
  totalPage: number;
  sections: FindSectionOneProps[] | FindSectionTwoProps[] | FindSectionThreeProps[] | FindSectionForProps[] | FindSectionFiveProps[];
};

//get data from section one
export async function getSectionOne(): Promise<GetProjectResponse> { // | null
  const { data, request } = await api.get('/v1/sectionOne/');
  // if (data.length <= 0) {
  //   return null;
  // }
  const section_one = data.sectionOne.map((section: FindSectionOneProps) => ({
    id: section.id,
    title: section.title,
    description_one: section.description_one,
    image_one: section.image_one ? section.image_one : 'not image',
    created_at: new Date(section.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    update_at: new Date(section.updated_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  }));
  return section_one;
}
//get data from section two
export async function getSectionTwo(): Promise<GetProjectResponse> { // | null
  const { data, request } = await api.get('/v1/sectionTwo/');
  // if (data.length <= 0) {
  //   return null;
  // }
  const section_two = data.sectionTwo.map((section: FindSectionTwoProps) => ({
    id: section.id,
    title: section.title,
    description_one: section.description_one,
    image_one: section.image_one ? section.image_one : 'not image',
    created_at: new Date(section.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    update_at: new Date(section.updated_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  }));
  return section_two;
}
//get data from section three
export async function getSectionThree(): Promise<GetProjectResponse> { // | null
  const { data, request } = await api.get('/v1/sectionThree/');
  // if (data.length <= 0) {
  //   return null;
  // }
  const section_three = data.sectionThree.map((section: FindSectionThreeProps) => ({
    id: section.id,
    title: section.title,
    description_one: section.description_one,
    image_one: section.image_one ? section.image_one : 'not image',
    created_at: new Date(section.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    update_at: new Date(section.updated_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  }));
  return section_three;
}
//get data from section for
export async function getSectionFor(): Promise<GetProjectResponse> { // | null
  const { data, request } = await api.get('/v1/sectionFor/');
  // if (data.length <= 0) {
  //   return null;
  // }
  const section_for = data.sectionFor.map((section: FindSectionForProps) => ({
    id: section.id,
    title: section.title,
    description_one: section.description_one,
    image_one: section.image_one ? section.image_one : 'not image',
    created_at: new Date(section.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    update_at: new Date(section.updated_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  }));
  return section_for;
}
//get data from section five
export async function getSectionFive(): Promise<GetProjectResponse> { // | null
  const { data, request } = await api.get('/v1/sectionFive/');
  // if (data.length <= 0) {
  //   return null;
  // }
  const section_five = data.sectionFive.map((section: FindSectionFiveProps) => ({
    id: section.id,
    title: section.title,
    description_one: section.description_one,
    image_one: section.image_one ? section.image_one : 'not image',
    created_at: new Date(section.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    update_at: new Date(section.updated_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  }));
  return section_five;
}

// use sections One, Two, Three, For and Five
export function useSectionOne() {
  return useQuery(['sectionOne'], () => getSectionOne(), {
    staleTime: 1000 * 60 * 10, // 1000 * 60 * 10 10 minutes // 1000 * 60 * 60 * 12, // 12 hours,
  });
}
export function useSectionTwo() {
  return useQuery(['sectionTwo'], () => getSectionTwo(), {
    staleTime: 1000 * 60 * 10, // 1000 * 60 * 10 10 minutes // 1000 * 60 * 60 * 12, // 12 hours,
  });
}
export function useSectionThree() {
  return useQuery(['sectionThree'], () => getSectionThree(), {
    staleTime: 1000 * 60 * 10, // 1000 * 60 * 10 10 minutes // 1000 * 60 * 60 * 12, // 12 hours,
  });
}
export function useSectionFor() {
  return useQuery(['sectionFor'], () => getSectionFor(), {
    staleTime: 1000 * 60 * 10, // 1000 * 60 * 10 10 minutes // 1000 * 60 * 60 * 12, // 12 hours,
  });
}
export function useSectionFive() {
  return useQuery(['sectionFive'], () => getSectionFive(), {
    staleTime: 1000 * 60 * 10, // 1000 * 60 * 10 10 minutes // 1000 * 60 * 60 * 12, // 12 hours,
  });
}

// delete sections One, Two, Three, For and Five
export async function deleteSectionOne(id: string) {
  await api.delete(`/v1/sectionOne/delete/${id}`);
}
export async function deleteSectionTwo(id: string) {
  await api.delete(`/v1/sectionTwo/delete/${id}`);
}
export async function deleteSectionThree(id: string) {
  await api.delete(`/v1/sectionThree/delete/${id}`);
}
export async function deleteSectionFor(id: string) {
  await api.delete(`/v1/sectionFor/delete/${id}`);
}
export async function deleteSectionFive(id: string) {
  await api.delete(`/v1/sectionFive/delete/${id}`);
}




