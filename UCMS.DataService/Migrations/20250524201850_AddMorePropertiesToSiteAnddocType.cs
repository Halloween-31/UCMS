using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UCMS.DataService.Migrations
{
    /// <inheritdoc />
    public partial class AddMorePropertiesToSiteAnddocType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageAlt",
                table: "Sites",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Sites",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Sites",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Sites",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "DocumentType",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageAlt",
                table: "Sites");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Sites");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Sites");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Sites");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "DocumentType");
        }
    }
}
