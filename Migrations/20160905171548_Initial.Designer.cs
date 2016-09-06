using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using todocore.Models;

namespace todocore.Migrations
{
    [DbContext(typeof(DbContextSqlite))]
    [Migration("20160905171548_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431");

            modelBuilder.Entity("todocore.Models.Todo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CompleteDate");

                    b.Property<DateTime>("CreateDate");

                    b.Property<DateTime>("DueDate");

                    b.Property<bool>("IsComplete");

                    b.Property<string>("Task")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Todos");
                });

            modelBuilder.Entity("todocore.Models.TodoComment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Text")
                        .IsRequired();

                    b.Property<int>("TodoId");

                    b.Property<DateTime>("UpdatedOn");

                    b.HasKey("Id");

                    b.HasIndex("TodoId");

                    b.ToTable("TodoComments");
                });

            modelBuilder.Entity("todocore.Models.TodoComment", b =>
                {
                    b.HasOne("todocore.Models.Todo")
                        .WithMany("TodoComments")
                        .HasForeignKey("TodoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
