using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class EventInstanceStateFieldsV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventInstanceStates_Reflections_ReflectionId",
                table: "EventInstanceStates");

            migrationBuilder.AlterColumn<Guid>(
                name: "ReflectionId",
                table: "EventInstanceStates",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<int>(
                name: "EventState",
                table: "EventInstanceStates",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_EventInstanceStates_Reflections_ReflectionId",
                table: "EventInstanceStates",
                column: "ReflectionId",
                principalTable: "Reflections",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventInstanceStates_Reflections_ReflectionId",
                table: "EventInstanceStates");

            migrationBuilder.AlterColumn<Guid>(
                name: "ReflectionId",
                table: "EventInstanceStates",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EventState",
                table: "EventInstanceStates",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_EventInstanceStates_Reflections_ReflectionId",
                table: "EventInstanceStates",
                column: "ReflectionId",
                principalTable: "Reflections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
