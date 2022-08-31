create database Image_upload;

create table uploads(
    id int identity(1,1) not null,
    image nvarchar(max) not null,
    createdat datetime default current_timestamp not null
)

select * from uploads
drop table uploads

delete from uploads