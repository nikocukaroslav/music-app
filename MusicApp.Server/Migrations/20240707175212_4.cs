using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MusicApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class _4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Users_UserId",
                table: "Albums");

            migrationBuilder.DropForeignKey(
                name: "FK_Musics_Users_UserId",
                table: "Musics");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Musics",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Duration",
                table: "Musics",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Albums",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Users_UserId",
                table: "Albums",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Musics_Users_UserId",
                table: "Musics",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Users_UserId",
                table: "Albums");

            migrationBuilder.DropForeignKey(
                name: "FK_Musics_Users_UserId",
                table: "Musics");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Musics");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Musics",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Albums",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Users_UserId",
                table: "Albums",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Musics_Users_UserId",
                table: "Musics",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
