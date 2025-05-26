using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UCMS.DataService.Migrations
{
    /// <inheritdoc />
    public partial class AddCodeModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Code",
                columns: table => new
                {
                    CodeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodeValue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DocumentTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Code", x => x.CodeId);
                    table.ForeignKey(
                        name: "FK_Code_DocumentType_DocumentTypeId",
                        column: x => x.DocumentTypeId,
                        principalTable: "DocumentType",
                        principalColumn: "DocumentTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Code_DocumentTypeId",
                table: "Code",
                column: "DocumentTypeId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Code");
        }
    }
}
