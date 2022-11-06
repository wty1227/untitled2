import request from "@/utils/http/request";

export function getNotice(parameter) {
  return request({
    url: "/sysNotice/export",
    method: "post",
    data: parameter,
  });
}


export function Permission(parameter) {
  return request({
    url: "/user/showStudentsCourseGrade?courseId=1",
    method: "post",
    data: parameter,
  });
}


export function Unpermission(parameter) {
  return request({
    url: "/user/getTeachers?schoolId=1",
    method: "post",
    data: parameter,
  });
}
