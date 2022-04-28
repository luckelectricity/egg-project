-- 查看所有数据库
show databases;

-- 创建数据库
create database
if not exists egg;

-- 删除数据库
drop database if exists egg;

-- 使用数据库
use egg;

-- 创建表
create table
if not exists user(
    id int not null auto_increment primary key,
    name varchar
(20) not null,
    age int not null,
    pwd varchar
(20) not null
)engine=innodb default charset=utf8;

-- 删除表
drop table if exists user;

-- 查看表结构
desc user;

--插入数据
insert into user
  (name,age,pwd)
values('张三', 18, '123');

-- 查询数据
select *
from user;

-- 根据id查询数据
select *
from user
where id=1;

-- 根据名称查询数据
select *
from user
where name='张三';

-- 根据名称查询id和年龄
select id, age
from user
where name='张三';
