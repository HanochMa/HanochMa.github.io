import{_ as c,o as t,c as o,z as e}from"./chunks/framework.7d656979.js";const B=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"javascript/2022-11-25-mysql删除重复数据.md","lastUpdated":1682239025000}'),d={name:"javascript/2022-11-25-mysql删除重复数据.md"},s=e("p",null,"-- 查询出所有重复的身份证号 （365条记录） select c.hzidCard from DAS_householdcode c GROUP BY c.hzidCard HAVING count(c.hzidCard) > 1 ('1','2','3')",-1),a=e("p",null,"-- 然后根据重复的身份证号码 查询出所有重复的记录 select * from DAS_householdcode s where s.hzidCard in ('1','2','3')",-1),i=e("p",null,"-- 所有重复的记录总共 972",-1),r=e("p",null,"-- 607+365=972",-1),n=e("p",null,"-- 查询出要留下那些记录 （留下重复记录中插入时间最晚的记录） select aa.cid from (select c.id cid, max(c.createtime) ctime from DAS_householdcode c GROUP BY c.hzidCard HAVING count(c.hzidCard) > 1) aa",-1),_=e("p",null,"-- 查询出要删除的记录（在查处所有重复记录的基础上，然后not in 要留下的记录） select * from DAS_householdcode s where s.hzidCard in ('1','2','3') and s.id not in (select aa.cid from (select c.id cid, max(c.createtime) ctime from DAS_householdcode c GROUP BY c.hzidCard HAVING count(c.hzidCard) > 1) aa)",-1),l=[s,a,i,r,n,_];function h(m,p,u,f,z,C){return t(),o("div",null,l)}const D=c(d,[["render",h]]);export{B as __pageData,D as default};
