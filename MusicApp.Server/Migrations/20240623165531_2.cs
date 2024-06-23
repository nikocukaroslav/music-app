using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MusicApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class _2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Musics_Albums_AlbumId",
                table: "Musics");

            migrationBuilder.DropIndex(
                name: "IX_Musics_AlbumId",
                table: "Musics");

            migrationBuilder.DropColumn(
                name: "AlbumId",
                table: "Musics");

            migrationBuilder.AddColumn<string>(
                name: "MusicList",
                table: "Albums",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MusicList",
                table: "Albums");

            migrationBuilder.AddColumn<Guid>(
                name: "AlbumId",
                table: "Musics",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Musics_AlbumId",
                table: "Musics",
                column: "AlbumId");

            migrationBuilder.AddForeignKey(
                name: "FK_Musics_Albums_AlbumId",
                table: "Musics",
                column: "AlbumId",
                principalTable: "Albums",
                principalColumn: "Id");
        }
    }
}
