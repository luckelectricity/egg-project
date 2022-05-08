create database memorize_words;

use memorize_words;

--- 用户表
create table user
(
  id int not null
  auto_increment primary key,
    name varchar
  (20) not null comment '用户名',
    age int not null comment '年龄',
    pwd varchar
  (64) not null comment '密码',
    avatar text comment '头像',
    phone varchar
  (20) comment '手机号',
    sign varchar
  (300) default null comment '个性签名',
    createTime timestamp default current_timestamp comment '创建时间',
    updateTime timestamp default current_timestamp on
  update current_timestamp comment '更新时间'
  )engine=innodb default charset=utf8;


  -- 创建单词表
  create table word
  (
    id int not null
    auto_increment primary key,
    word varchar
    (20) not null comment '单词',
    mean varchar
    (300) not null comment '单词含义',
    status int default 0 comment '状态',
    grade int default 0 comment '等级',
    remark varchar
    (300) default null comment '备注',
    createTime timestamp default current_timestamp comment '创建时间',
    updateTime timestamp default current_timestamp on
    update current_timestamp comment '更新时间'
    )engine=innodb default charset=utf8;

    --- 更新word 表
    --- alter table word add column status int default 0 comment '状态';

    --- alter table word add column grade int default 0 comment '等级';
