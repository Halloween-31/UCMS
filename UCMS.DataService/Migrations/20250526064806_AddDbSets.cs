using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UCMS.DataService.Migrations
{
    /// <inheritdoc />
    public partial class AddDbSets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Code_DocumentType_DocumentTypeId",
                table: "Code");

            migrationBuilder.DropForeignKey(
                name: "FK_Content_DocumentType_DocumentTypeId",
                table: "Content");

            migrationBuilder.DropForeignKey(
                name: "FK_ContentProperty_Content_ContentId",
                table: "ContentProperty");

            migrationBuilder.DropForeignKey(
                name: "FK_ContentProperty_Property_PropertyId",
                table: "ContentProperty");

            migrationBuilder.DropForeignKey(
                name: "FK_DocumentType_Sites_SiteId",
                table: "DocumentType");

            migrationBuilder.DropForeignKey(
                name: "FK_Property_DocumentType_DocumentTypeId",
                table: "Property");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Property",
                table: "Property");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DocumentType",
                table: "DocumentType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContentProperty",
                table: "ContentProperty");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Content",
                table: "Content");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Code",
                table: "Code");

            migrationBuilder.RenameTable(
                name: "Property",
                newName: "Properties");

            migrationBuilder.RenameTable(
                name: "DocumentType",
                newName: "DocumentTypes");

            migrationBuilder.RenameTable(
                name: "ContentProperty",
                newName: "ContentProperties");

            migrationBuilder.RenameTable(
                name: "Content",
                newName: "Contents");

            migrationBuilder.RenameTable(
                name: "Code",
                newName: "Codes");

            migrationBuilder.RenameIndex(
                name: "IX_Property_DocumentTypeId",
                table: "Properties",
                newName: "IX_Properties_DocumentTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_DocumentType_SiteId",
                table: "DocumentTypes",
                newName: "IX_DocumentTypes_SiteId");

            migrationBuilder.RenameIndex(
                name: "IX_ContentProperty_PropertyId",
                table: "ContentProperties",
                newName: "IX_ContentProperties_PropertyId");

            migrationBuilder.RenameIndex(
                name: "IX_ContentProperty_ContentId",
                table: "ContentProperties",
                newName: "IX_ContentProperties_ContentId");

            migrationBuilder.RenameIndex(
                name: "IX_Content_DocumentTypeId",
                table: "Contents",
                newName: "IX_Contents_DocumentTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Code_DocumentTypeId",
                table: "Codes",
                newName: "IX_Codes_DocumentTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Properties",
                table: "Properties",
                column: "PropertyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DocumentTypes",
                table: "DocumentTypes",
                column: "DocumentTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContentProperties",
                table: "ContentProperties",
                column: "ContentPropertyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contents",
                table: "Contents",
                column: "ContentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Codes",
                table: "Codes",
                column: "CodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Codes_DocumentTypes_DocumentTypeId",
                table: "Codes",
                column: "DocumentTypeId",
                principalTable: "DocumentTypes",
                principalColumn: "DocumentTypeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ContentProperties_Contents_ContentId",
                table: "ContentProperties",
                column: "ContentId",
                principalTable: "Contents",
                principalColumn: "ContentId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentProperties_Properties_PropertyId",
                table: "ContentProperties",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "PropertyId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contents_DocumentTypes_DocumentTypeId",
                table: "Contents",
                column: "DocumentTypeId",
                principalTable: "DocumentTypes",
                principalColumn: "DocumentTypeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DocumentTypes_Sites_SiteId",
                table: "DocumentTypes",
                column: "SiteId",
                principalTable: "Sites",
                principalColumn: "SiteId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_DocumentTypes_DocumentTypeId",
                table: "Properties",
                column: "DocumentTypeId",
                principalTable: "DocumentTypes",
                principalColumn: "DocumentTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Codes_DocumentTypes_DocumentTypeId",
                table: "Codes");

            migrationBuilder.DropForeignKey(
                name: "FK_ContentProperties_Contents_ContentId",
                table: "ContentProperties");

            migrationBuilder.DropForeignKey(
                name: "FK_ContentProperties_Properties_PropertyId",
                table: "ContentProperties");

            migrationBuilder.DropForeignKey(
                name: "FK_Contents_DocumentTypes_DocumentTypeId",
                table: "Contents");

            migrationBuilder.DropForeignKey(
                name: "FK_DocumentTypes_Sites_SiteId",
                table: "DocumentTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_DocumentTypes_DocumentTypeId",
                table: "Properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Properties",
                table: "Properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DocumentTypes",
                table: "DocumentTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Contents",
                table: "Contents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContentProperties",
                table: "ContentProperties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Codes",
                table: "Codes");

            migrationBuilder.RenameTable(
                name: "Properties",
                newName: "Property");

            migrationBuilder.RenameTable(
                name: "DocumentTypes",
                newName: "DocumentType");

            migrationBuilder.RenameTable(
                name: "Contents",
                newName: "Content");

            migrationBuilder.RenameTable(
                name: "ContentProperties",
                newName: "ContentProperty");

            migrationBuilder.RenameTable(
                name: "Codes",
                newName: "Code");

            migrationBuilder.RenameIndex(
                name: "IX_Properties_DocumentTypeId",
                table: "Property",
                newName: "IX_Property_DocumentTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_DocumentTypes_SiteId",
                table: "DocumentType",
                newName: "IX_DocumentType_SiteId");

            migrationBuilder.RenameIndex(
                name: "IX_Contents_DocumentTypeId",
                table: "Content",
                newName: "IX_Content_DocumentTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_ContentProperties_PropertyId",
                table: "ContentProperty",
                newName: "IX_ContentProperty_PropertyId");

            migrationBuilder.RenameIndex(
                name: "IX_ContentProperties_ContentId",
                table: "ContentProperty",
                newName: "IX_ContentProperty_ContentId");

            migrationBuilder.RenameIndex(
                name: "IX_Codes_DocumentTypeId",
                table: "Code",
                newName: "IX_Code_DocumentTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Property",
                table: "Property",
                column: "PropertyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DocumentType",
                table: "DocumentType",
                column: "DocumentTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Content",
                table: "Content",
                column: "ContentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContentProperty",
                table: "ContentProperty",
                column: "ContentPropertyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Code",
                table: "Code",
                column: "CodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Code_DocumentType_DocumentTypeId",
                table: "Code",
                column: "DocumentTypeId",
                principalTable: "DocumentType",
                principalColumn: "DocumentTypeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Content_DocumentType_DocumentTypeId",
                table: "Content",
                column: "DocumentTypeId",
                principalTable: "DocumentType",
                principalColumn: "DocumentTypeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ContentProperty_Content_ContentId",
                table: "ContentProperty",
                column: "ContentId",
                principalTable: "Content",
                principalColumn: "ContentId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentProperty_Property_PropertyId",
                table: "ContentProperty",
                column: "PropertyId",
                principalTable: "Property",
                principalColumn: "PropertyId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DocumentType_Sites_SiteId",
                table: "DocumentType",
                column: "SiteId",
                principalTable: "Sites",
                principalColumn: "SiteId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Property_DocumentType_DocumentTypeId",
                table: "Property",
                column: "DocumentTypeId",
                principalTable: "DocumentType",
                principalColumn: "DocumentTypeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
