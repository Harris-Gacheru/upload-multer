-- create database Image_upload;

create table uploads(
    id int identity(1,1) not null,
    name varchar(255) not null,
    image nvarchar(max) not null,
    createdat datetime default current_timestamp not null
)

-- select * from uploads
-- drop table uploads

-- delete from uploads

-- create or alter procedure uploadData @name varchar(255), @image nvarchar(max)
-- as
-- begin

-- insert into uploads
-- (name, image)values(@name, @image)

-- end