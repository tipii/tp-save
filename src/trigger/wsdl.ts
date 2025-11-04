export const wsdl = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns:http="http://schemas.xmlsoap.org/wsdl/http/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:s0="urn:WebServ_EasyTablet" xmlns="http://schemas.xmlsoap.org/wsdl/" targetNamespace="urn:WebServ_EasyTablet">
  <types>
    <xsd:schema elementFormDefault="unqualified" targetNamespace="urn:WebServ_EasyTablet">
      <xsd:simpleType name="WLChar">
        <xsd:restriction base="xsd:string">
          <xsd:length value="1" fixed="true"/>
        </xsd:restriction>
      </xsd:simpleType>
      <xsd:complexType name="tListe_Articles">
        <xsd:sequence>
          <xsd:element name="P_PtVente" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Articles" type="s0:tListe_Articles"/>
      <xsd:complexType name="tListe_ArticlesResponse">
        <xsd:sequence>
          <xsd:element name="Liste_ArticlesResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_ArticlesResponse" type="s0:tListe_ArticlesResponse"/>
      <xsd:complexType name="tStockDispo_Articles">
        <xsd:sequence>
          <xsd:element name="P_PtVente" type="xsd:string"/>
          <xsd:element name="P_LstArticles" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="StockDispo_Articles" type="s0:tStockDispo_Articles"/>
      <xsd:complexType name="tStockDispo_ArticlesResponse">
        <xsd:sequence>
          <xsd:element name="StockDispo_ArticlesResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="StockDispo_ArticlesResponse" type="s0:tStockDispo_ArticlesResponse"/>
      <xsd:complexType name="tStockDispo_UnArticle">
        <xsd:sequence>
          <xsd:element name="P_PtVente" type="xsd:string"/>
          <xsd:element name="P_IDArticle" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="StockDispo_UnArticle" type="s0:tStockDispo_UnArticle"/>
      <xsd:complexType name="tStockDispo_UnArticleResponse">
        <xsd:sequence>
          <xsd:element name="StockDispo_UnArticleResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="StockDispo_UnArticleResponse" type="s0:tStockDispo_UnArticleResponse"/>
      <xsd:complexType name="tListe_RDVHebdo">
        <xsd:sequence>
          <xsd:element name="P_IDRepr" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_RDVHebdo" type="s0:tListe_RDVHebdo"/>
      <xsd:complexType name="tListe_RDVHebdoResponse">
        <xsd:sequence>
          <xsd:element name="Liste_RDVHebdoResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_RDVHebdoResponse" type="s0:tListe_RDVHebdoResponse"/>
      <xsd:complexType name="tListe_LotsStock_Articles">
        <xsd:sequence>
          <xsd:element name="P_PtVente" type="xsd:string"/>
          <xsd:element name="p_Repres" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LotsStock_Articles" type="s0:tListe_LotsStock_Articles"/>
      <xsd:complexType name="tListe_LotsStock_ArticlesResponse">
        <xsd:sequence>
          <xsd:element name="Liste_LotsStock_ArticlesResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LotsStock_ArticlesResponse" type="s0:tListe_LotsStock_ArticlesResponse"/>
      <xsd:complexType name="tImport_DocCom">
        <xsd:sequence>
          <xsd:element name="P_DocCom" type="xsd:string"/>
          <xsd:element name="P_ClefCRC" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_DocCom" type="s0:tImport_DocCom"/>
      <xsd:complexType name="tImport_DocComResponse">
        <xsd:sequence>
          <xsd:element name="Import_DocComResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_DocComResponse" type="s0:tImport_DocComResponse"/>
      <xsd:complexType name="tEtat_DocCom">
        <xsd:sequence>
          <xsd:element name="P_Liste_DocCom" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Etat_DocCom" type="s0:tEtat_DocCom"/>
      <xsd:complexType name="tEtat_DocComResponse">
        <xsd:sequence>
          <xsd:element name="Etat_DocComResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Etat_DocComResponse" type="s0:tEtat_DocComResponse"/>
      <xsd:complexType name="tListe_ParamGeneModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_ParamGeneModif" type="s0:tListe_ParamGeneModif"/>
      <xsd:complexType name="tListe_ParamGeneModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_ParamGeneModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_ParamGeneModifResponse" type="s0:tListe_ParamGeneModifResponse"/>
      <xsd:complexType name="tListe_ParamArtModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_ParamArtModif" type="s0:tListe_ParamArtModif"/>
      <xsd:complexType name="tListe_ParamArtModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_ParamArtModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_ParamArtModifResponse" type="s0:tListe_ParamArtModifResponse"/>
      <xsd:complexType name="tListe_LiensArtModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_IDTermMobil" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LiensArtModif" type="s0:tListe_LiensArtModif"/>
      <xsd:complexType name="tListe_LiensArtModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_LiensArtModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LiensArtModifResponse" type="s0:tListe_LiensArtModifResponse"/>
      <xsd:complexType name="tListe_ParamCliModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_ParamCliModif" type="s0:tListe_ParamCliModif"/>
      <xsd:complexType name="tListe_ParamCliModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_ParamCliModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_ParamCliModifResponse" type="s0:tListe_ParamCliModifResponse"/>
      <xsd:complexType name="tListe_FichCliModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_IDTermMobil" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FichCliModif" type="s0:tListe_FichCliModif"/>
      <xsd:complexType name="tListe_FichCliModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_FichCliModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FichCliModifResponse" type="s0:tListe_FichCliModifResponse"/>
      <xsd:complexType name="tListe_LiensCliModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_IDTermMobil" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LiensCliModif" type="s0:tListe_LiensCliModif"/>
      <xsd:complexType name="tListe_LiensCliModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_LiensCliModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LiensCliModifResponse" type="s0:tListe_LiensCliModifResponse"/>
      <xsd:complexType name="tListe_ReprModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_IDTermMobil" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_ReprModif" type="s0:tListe_ReprModif"/>
      <xsd:complexType name="tListe_ReprModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_ReprModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_ReprModifResponse" type="s0:tListe_ReprModifResponse"/>
      <xsd:complexType name="tListe_TarifsModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_IDTermMobil" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_TarifsModif" type="s0:tListe_TarifsModif"/>
      <xsd:complexType name="tListe_TarifsModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_TarifsModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_TarifsModifResponse" type="s0:tListe_TarifsModifResponse"/>
      <xsd:complexType name="tImport_DataGPS">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_DataGPS" type="s0:tImport_DataGPS"/>
      <xsd:complexType name="tImport_DataGPSResponse">
        <xsd:sequence>
          <xsd:element name="Import_DataGPSResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_DataGPSResponse" type="s0:tImport_DataGPSResponse"/>
      <xsd:complexType name="tListe_LotsModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_IDTermMobil" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LotsModif" type="s0:tListe_LotsModif"/>
      <xsd:complexType name="tListe_LotsModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_LotsModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LotsModifResponse" type="s0:tListe_LotsModifResponse"/>
      <xsd:complexType name="tListe_TarifsModif_bis">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_IDTermMobil" type="xsd:string"/>
          <xsd:element name="P_PtVente" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_TarifsModif_bis" type="s0:tListe_TarifsModif_bis"/>
      <xsd:complexType name="tListe_TarifsModif_bisResponse">
        <xsd:sequence>
          <xsd:element name="Liste_TarifsModif_bisResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_TarifsModif_bisResponse" type="s0:tListe_TarifsModif_bisResponse"/>
      <xsd:complexType name="tListe_TarifsModif_ter">
        <xsd:sequence>
          <xsd:element name="P_DateDeb" type="xsd:string"/>
          <xsd:element name="P_DateFin" type="xsd:string"/>
          <xsd:element name="P_IDTermMobil" type="xsd:string"/>
          <xsd:element name="P_PtVente" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_TarifsModif_ter" type="s0:tListe_TarifsModif_ter"/>
      <xsd:complexType name="tListe_TarifsModif_terResponse">
        <xsd:sequence>
          <xsd:element name="Liste_TarifsModif_terResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_TarifsModif_terResponse" type="s0:tListe_TarifsModif_terResponse"/>
      <xsd:complexType name="tListe_FichArtModif_v2">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_IDTermMobil" type="xsd:string"/>
          <xsd:element name="P_Page" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FichArtModif_v2" type="s0:tListe_FichArtModif_v2"/>
      <xsd:complexType name="tListe_FichArtModif_v2Response">
        <xsd:sequence>
          <xsd:element name="Liste_FichArtModif_v2Result" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FichArtModif_v2Response" type="s0:tListe_FichArtModif_v2Response"/>
      <xsd:complexType name="tImport_DocSto">
        <xsd:sequence>
          <xsd:element name="P_DocSto" type="xsd:string"/>
          <xsd:element name="P_ClefCRC" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_DocSto" type="s0:tImport_DocSto"/>
      <xsd:complexType name="tImport_DocStoResponse">
        <xsd:sequence>
          <xsd:element name="Import_DocStoResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_DocStoResponse" type="s0:tImport_DocStoResponse"/>
      <xsd:complexType name="tEtat_DocSto">
        <xsd:sequence>
          <xsd:element name="P_Liste_DocSto" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Etat_DocSto" type="s0:tEtat_DocSto"/>
      <xsd:complexType name="tEtat_DocStoResponse">
        <xsd:sequence>
          <xsd:element name="Etat_DocStoResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Etat_DocStoResponse" type="s0:tEtat_DocStoResponse"/>
      <xsd:complexType name="tEncours_Clients">
        <xsd:sequence>
          <xsd:element name="P_IDRepr" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Encours_Clients" type="s0:tEncours_Clients"/>
      <xsd:complexType name="tEncours_ClientsResponse">
        <xsd:sequence>
          <xsd:element name="Encours_ClientsResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Encours_ClientsResponse" type="s0:tEncours_ClientsResponse"/>
      <xsd:complexType name="tListe_DocStoModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_TypeDocSto" type="xsd:string"/>
          <xsd:element name="P_StatutMin" type="xsd:string"/>
          <xsd:element name="P_StatutMax" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_DocStoModif" type="s0:tListe_DocStoModif"/>
      <xsd:complexType name="tListe_DocStoModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_DocStoModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_DocStoModifResponse" type="s0:tListe_DocStoModifResponse"/>
      <xsd:complexType name="tExport_DocSto">
        <xsd:sequence>
          <xsd:element name="P_NumDoc_Easy" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Export_DocSto" type="s0:tExport_DocSto"/>
      <xsd:complexType name="tExport_DocStoResponse">
        <xsd:sequence>
          <xsd:element name="Export_DocStoResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Export_DocStoResponse" type="s0:tExport_DocStoResponse"/>
      <xsd:complexType name="tListe_UtilModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_IDTermMobil" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_UtilModif" type="s0:tListe_UtilModif"/>
      <xsd:complexType name="tListe_UtilModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_UtilModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_UtilModifResponse" type="s0:tListe_UtilModifResponse"/>
      <xsd:complexType name="tImport_DocSto_Modif">
        <xsd:sequence>
          <xsd:element name="P_DocSto" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_DocSto_Modif" type="s0:tImport_DocSto_Modif"/>
      <xsd:complexType name="tImport_DocSto_ModifResponse">
        <xsd:sequence>
          <xsd:element name="Import_DocSto_ModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_DocSto_ModifResponse" type="s0:tImport_DocSto_ModifResponse"/>
      <xsd:complexType name="tListe_UtilStock"/>
      <xsd:element name="Liste_UtilStock" type="s0:tListe_UtilStock"/>
      <xsd:complexType name="tListe_UtilStockResponse">
        <xsd:sequence>
          <xsd:element name="Liste_UtilStockResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_UtilStockResponse" type="s0:tListe_UtilStockResponse"/>
      <xsd:complexType name="tListe_LotsStock_Articles_All">
        <xsd:sequence>
          <xsd:element name="P_PtVente" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LotsStock_Articles_All" type="s0:tListe_LotsStock_Articles_All"/>
      <xsd:complexType name="tListe_LotsStock_Articles_AllResponse">
        <xsd:sequence>
          <xsd:element name="Liste_LotsStock_Articles_AllResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LotsStock_Articles_AllResponse" type="s0:tListe_LotsStock_Articles_AllResponse"/>
      <xsd:complexType name="tListe_LiensArtModif_All">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LiensArtModif_All" type="s0:tListe_LiensArtModif_All"/>
      <xsd:complexType name="tListe_LiensArtModif_AllResponse">
        <xsd:sequence>
          <xsd:element name="Liste_LiensArtModif_AllResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LiensArtModif_AllResponse" type="s0:tListe_LiensArtModif_AllResponse"/>
      <xsd:complexType name="tListe_FichCliModif_All">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FichCliModif_All" type="s0:tListe_FichCliModif_All"/>
      <xsd:complexType name="tListe_FichCliModif_AllResponse">
        <xsd:sequence>
          <xsd:element name="Liste_FichCliModif_AllResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FichCliModif_AllResponse" type="s0:tListe_FichCliModif_AllResponse"/>
      <xsd:complexType name="tListe_FichArtModif_All">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_Page" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FichArtModif_All" type="s0:tListe_FichArtModif_All"/>
      <xsd:complexType name="tListe_FichArtModif_AllResponse">
        <xsd:sequence>
          <xsd:element name="Liste_FichArtModif_AllResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FichArtModif_AllResponse" type="s0:tListe_FichArtModif_AllResponse"/>
      <xsd:complexType name="tEmail_DocCom">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Email_DocCom" type="s0:tEmail_DocCom"/>
      <xsd:complexType name="tEmail_DocComResponse">
        <xsd:sequence>
          <xsd:element name="Email_DocComResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Email_DocComResponse" type="s0:tEmail_DocComResponse"/>
      <xsd:complexType name="tListe_LotsModif_All">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LotsModif_All" type="s0:tListe_LotsModif_All"/>
      <xsd:complexType name="tListe_LotsModif_AllResponse">
        <xsd:sequence>
          <xsd:element name="Liste_LotsModif_AllResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LotsModif_AllResponse" type="s0:tListe_LotsModif_AllResponse"/>
      <xsd:complexType name="tListe_DetLotArtModif_All">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_Page" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_DetLotArtModif_All" type="s0:tListe_DetLotArtModif_All"/>
      <xsd:complexType name="tListe_DetLotArtModif_AllResponse">
        <xsd:sequence>
          <xsd:element name="Liste_DetLotArtModif_AllResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_DetLotArtModif_AllResponse" type="s0:tListe_DetLotArtModif_AllResponse"/>
      <xsd:complexType name="tOuvreFichierLOG"/>
      <xsd:element name="OuvreFichierLOG" type="s0:tOuvreFichierLOG"/>
      <xsd:complexType name="tOuvreFichierLOGResponse"/>
      <xsd:element name="OuvreFichierLOGResponse" type="s0:tOuvreFichierLOGResponse"/>
      <xsd:complexType name="tEcrit_LOG">
        <xsd:sequence>
          <xsd:element name="P_ZoneLOG" type="xsd:string"/>
          <xsd:element name="P_Message" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Ecrit_LOG" type="s0:tEcrit_LOG"/>
      <xsd:complexType name="tEcrit_LOGResponse"/>
      <xsd:element name="Ecrit_LOGResponse" type="s0:tEcrit_LOGResponse"/>
      <xsd:complexType name="tListe_LotsStock_Articles_v2">
        <xsd:sequence>
          <xsd:element name="P_PtVente" type="xsd:string"/>
          <xsd:element name="p_Repres" type="xsd:string"/>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LotsStock_Articles_v2" type="s0:tListe_LotsStock_Articles_v2"/>
      <xsd:complexType name="tListe_LotsStock_Articles_v2Response">
        <xsd:sequence>
          <xsd:element name="Liste_LotsStock_Articles_v2Result" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LotsStock_Articles_v2Response" type="s0:tListe_LotsStock_Articles_v2Response"/>
      <xsd:complexType name="tListe_TarifsModif_optim">
        <xsd:sequence>
          <xsd:element name="P_DateDeb" type="xsd:string"/>
          <xsd:element name="P_DateFin" type="xsd:string"/>
          <xsd:element name="P_IDTermMobil" type="xsd:string"/>
          <xsd:element name="P_PtVente" type="xsd:string"/>
          <xsd:element name="P_Optim" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_TarifsModif_optim" type="s0:tListe_TarifsModif_optim"/>
      <xsd:complexType name="tListe_TarifsModif_optimResponse">
        <xsd:sequence>
          <xsd:element name="Liste_TarifsModif_optimResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_TarifsModif_optimResponse" type="s0:tListe_TarifsModif_optimResponse"/>
      <xsd:complexType name="tStockDispo_ListeArticles">
        <xsd:sequence>
          <xsd:element name="P_LstArticles" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="StockDispo_ListeArticles" type="s0:tStockDispo_ListeArticles"/>
      <xsd:complexType name="tStockDispo_ListeArticlesResponse">
        <xsd:sequence>
          <xsd:element name="StockDispo_ListeArticlesResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="StockDispo_ListeArticlesResponse" type="s0:tStockDispo_ListeArticlesResponse"/>
      <xsd:complexType name="tImport_CDB">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_CDB" type="s0:tImport_CDB"/>
      <xsd:complexType name="tImport_CDBResponse">
        <xsd:sequence>
          <xsd:element name="Import_CDBResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_CDBResponse" type="s0:tImport_CDBResponse"/>
      <xsd:complexType name="tImport_DLUO">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_DLUO" type="s0:tImport_DLUO"/>
      <xsd:complexType name="tImport_DLUOResponse">
        <xsd:sequence>
          <xsd:element name="Import_DLUOResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_DLUOResponse" type="s0:tImport_DLUOResponse"/>
      <xsd:complexType name="tModif_DocSto">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Modif_DocSto" type="s0:tModif_DocSto"/>
      <xsd:complexType name="tModif_DocStoResponse">
        <xsd:sequence>
          <xsd:element name="Modif_DocStoResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Modif_DocStoResponse" type="s0:tModif_DocStoResponse"/>
      <xsd:complexType name="tListe_BacsPrepa">
        <xsd:sequence>
          <xsd:element name="P_IDEnt" type="xsd:string"/>
          <xsd:element name="P_IDUser" type="xsd:string"/>
          <xsd:element name="P_Statut" type="xsd:string"/>
          <xsd:element name="P_IDUtil" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_BacsPrepa" type="s0:tListe_BacsPrepa"/>
      <xsd:complexType name="tListe_BacsPrepaResponse">
        <xsd:sequence>
          <xsd:element name="Liste_BacsPrepaResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_BacsPrepaResponse" type="s0:tListe_BacsPrepaResponse"/>
      <xsd:complexType name="tListe_BonPrepa_Bac">
        <xsd:sequence>
          <xsd:element name="P_IDBac" type="xsd:string"/>
          <xsd:element name="P_IDUser" type="xsd:string"/>
          <xsd:element name="P_Statut" type="xsd:string"/>
          <xsd:element name="P_OrderBy" type="xsd:string"/>
          <xsd:element name="P_OrderAscDesc" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_BonPrepa_Bac" type="s0:tListe_BonPrepa_Bac"/>
      <xsd:complexType name="tListe_BonPrepa_BacResponse">
        <xsd:sequence>
          <xsd:element name="Liste_BonPrepa_BacResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_BonPrepa_BacResponse" type="s0:tListe_BonPrepa_BacResponse"/>
      <xsd:complexType name="tListe_Lignes_BonPrepa">
        <xsd:sequence>
          <xsd:element name="P_IDDoc" type="xsd:string"/>
          <xsd:element name="P_Ordre" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Lignes_BonPrepa" type="s0:tListe_Lignes_BonPrepa"/>
      <xsd:complexType name="tListe_Lignes_BonPrepaResponse">
        <xsd:sequence>
          <xsd:element name="Liste_Lignes_BonPrepaResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Lignes_BonPrepaResponse" type="s0:tListe_Lignes_BonPrepaResponse"/>
      <xsd:complexType name="tImport_QuiPrepa">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_QuiPrepa" type="s0:tImport_QuiPrepa"/>
      <xsd:complexType name="tImport_QuiPrepaResponse">
        <xsd:sequence>
          <xsd:element name="Import_QuiPrepaResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_QuiPrepaResponse" type="s0:tImport_QuiPrepaResponse"/>
      <xsd:complexType name="tImport_StatutDocCom">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_StatutDocCom" type="s0:tImport_StatutDocCom"/>
      <xsd:complexType name="tImport_StatutDocComResponse">
        <xsd:sequence>
          <xsd:element name="Import_StatutDocComResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_StatutDocComResponse" type="s0:tImport_StatutDocComResponse"/>
      <xsd:complexType name="tListe_Preparateurs">
        <xsd:sequence>
          <xsd:element name="P_IDEnt" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Preparateurs" type="s0:tListe_Preparateurs"/>
      <xsd:complexType name="tListe_PreparateursResponse">
        <xsd:sequence>
          <xsd:element name="Liste_PreparateursResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_PreparateursResponse" type="s0:tListe_PreparateursResponse"/>
      <xsd:complexType name="tEmail_Palmares">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Email_Palmares" type="s0:tEmail_Palmares"/>
      <xsd:complexType name="tEmail_PalmaresResponse">
        <xsd:sequence>
          <xsd:element name="Email_PalmaresResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Email_PalmaresResponse" type="s0:tEmail_PalmaresResponse"/>
      <xsd:complexType name="tAdresse_Client">
        <xsd:sequence>
          <xsd:element name="P_IDClient" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Adresse_Client" type="s0:tAdresse_Client"/>
      <xsd:complexType name="tAdresse_ClientResponse">
        <xsd:sequence>
          <xsd:element name="Adresse_ClientResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Adresse_ClientResponse" type="s0:tAdresse_ClientResponse"/>
      <xsd:complexType name="tListe_Transfert_Ent">
        <xsd:sequence>
          <xsd:element name="P_IDEnt" type="xsd:string"/>
          <xsd:element name="P_LoginUser" type="xsd:string"/>
          <xsd:element name="P_Statut" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Transfert_Ent" type="s0:tListe_Transfert_Ent"/>
      <xsd:complexType name="tListe_Transfert_EntResponse">
        <xsd:sequence>
          <xsd:element name="Liste_Transfert_EntResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Transfert_EntResponse" type="s0:tListe_Transfert_EntResponse"/>
      <xsd:complexType name="tListe_Lignes_Transfert">
        <xsd:sequence>
          <xsd:element name="P_IDDoc" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Lignes_Transfert" type="s0:tListe_Lignes_Transfert"/>
      <xsd:complexType name="tListe_Lignes_TransfertResponse">
        <xsd:sequence>
          <xsd:element name="Liste_Lignes_TransfertResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Lignes_TransfertResponse" type="s0:tListe_Lignes_TransfertResponse"/>
      <xsd:complexType name="tImport_StatutDocSto">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_StatutDocSto" type="s0:tImport_StatutDocSto"/>
      <xsd:complexType name="tImport_StatutDocStoResponse">
        <xsd:sequence>
          <xsd:element name="Import_StatutDocStoResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_StatutDocStoResponse" type="s0:tImport_StatutDocStoResponse"/>
      <xsd:complexType name="tTrace_GPS">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Trace_GPS" type="s0:tTrace_GPS"/>
      <xsd:complexType name="tTrace_GPSResponse">
        <xsd:sequence>
          <xsd:element name="Trace_GPSResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Trace_GPSResponse" type="s0:tTrace_GPSResponse"/>
      <xsd:complexType name="tBalanceAgee_UnClient">
        <xsd:sequence>
          <xsd:element name="P_CodeClient" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="BalanceAgee_UnClient" type="s0:tBalanceAgee_UnClient"/>
      <xsd:complexType name="tBalanceAgee_UnClientResponse">
        <xsd:sequence>
          <xsd:element name="BalanceAgee_UnClientResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="BalanceAgee_UnClientResponse" type="s0:tBalanceAgee_UnClientResponse"/>
      <xsd:complexType name="tUtil_DateHeure_Serveur"/>
      <xsd:element name="Util_DateHeure_Serveur" type="s0:tUtil_DateHeure_Serveur"/>
      <xsd:complexType name="tUtil_DateHeure_ServeurResponse">
        <xsd:sequence>
          <xsd:element name="Util_DateHeure_ServeurResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Util_DateHeure_ServeurResponse" type="s0:tUtil_DateHeure_ServeurResponse"/>
      <xsd:complexType name="tCadencierPrdt_Client">
        <xsd:sequence>
          <xsd:element name="P_CodeClient" type="xsd:string"/>
          <xsd:element name="P_DebPeriode" type="xsd:string"/>
          <xsd:element name="P_FinPeriode" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="CadencierPrdt_Client" type="s0:tCadencierPrdt_Client"/>
      <xsd:complexType name="tCadencierPrdt_ClientResponse">
        <xsd:sequence>
          <xsd:element name="CadencierPrdt_ClientResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="CadencierPrdt_ClientResponse" type="s0:tCadencierPrdt_ClientResponse"/>
      <xsd:complexType name="tConnexionWeb">
        <xsd:sequence>
          <xsd:element name="P_User" type="xsd:string"/>
          <xsd:element name="P_Pswd" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="ConnexionWeb" type="s0:tConnexionWeb"/>
      <xsd:complexType name="tConnexionWebResponse">
        <xsd:sequence>
          <xsd:element name="ConnexionWebResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="ConnexionWebResponse" type="s0:tConnexionWebResponse"/>
      <xsd:complexType name="tListe_Transporteurs">
        <xsd:sequence>
          <xsd:element name="P_IDClient" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Transporteurs" type="s0:tListe_Transporteurs"/>
      <xsd:complexType name="tListe_TransporteursResponse">
        <xsd:sequence>
          <xsd:element name="Liste_TransporteursResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_TransporteursResponse" type="s0:tListe_TransporteursResponse"/>
      <xsd:complexType name="tListe_Familles">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Familles" type="s0:tListe_Familles"/>
      <xsd:complexType name="tListe_FamillesResponse">
        <xsd:sequence>
          <xsd:element name="Liste_FamillesResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FamillesResponse" type="s0:tListe_FamillesResponse"/>
      <xsd:complexType name="tListe_ArtStockModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_IDRepresentant" type="xsd:string"/>
          <xsd:element name="P_Page" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_ArtStockModif" type="s0:tListe_ArtStockModif"/>
      <xsd:complexType name="tListe_ArtStockModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_ArtStockModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_ArtStockModifResponse" type="s0:tListe_ArtStockModifResponse"/>
      <xsd:complexType name="tPrixArticle">
        <xsd:sequence>
          <xsd:element name="P_IDArticle" type="xsd:string"/>
          <xsd:element name="P_IDPointDeVente" type="xsd:string"/>
          <xsd:element name="P_IDClient" type="xsd:string"/>
          <xsd:element name="P_CodeTarif" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="PrixArticle" type="s0:tPrixArticle"/>
      <xsd:complexType name="tPrixArticleResponse">
        <xsd:sequence>
          <xsd:element name="PrixArticleResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="PrixArticleResponse" type="s0:tPrixArticleResponse"/>
      <xsd:complexType name="tModif_ConnexionWeb">
        <xsd:sequence>
          <xsd:element name="P_User" type="xsd:string"/>
          <xsd:element name="P_Pswd" type="xsd:string"/>
          <xsd:element name="P_NewPswd" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Modif_ConnexionWeb" type="s0:tModif_ConnexionWeb"/>
      <xsd:complexType name="tModif_ConnexionWebResponse">
        <xsd:sequence>
          <xsd:element name="Modif_ConnexionWebResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Modif_ConnexionWebResponse" type="s0:tModif_ConnexionWebResponse"/>
      <xsd:complexType name="tListe_DocCom">
        <xsd:sequence>
          <xsd:element name="P_TypeDoc" type="xsd:string"/>
          <xsd:element name="P_NumDoc" type="xsd:string"/>
          <xsd:element name="P_CodeClient" type="xsd:string"/>
          <xsd:element name="P_NbDocs" type="xsd:string"/>
          <xsd:element name="P_DateDeb" type="xsd:string"/>
          <xsd:element name="P_DateFin" type="xsd:string"/>
          <xsd:element name="P_NivDet" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_DocCom" type="s0:tListe_DocCom"/>
      <xsd:complexType name="tListe_DocComResponse">
        <xsd:sequence>
          <xsd:element name="Liste_DocComResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_DocComResponse" type="s0:tListe_DocComResponse"/>
      <xsd:complexType name="tListe_PrixArticle">
        <xsd:sequence>
          <xsd:element name="P_Mode" type="xsd:string"/>
          <xsd:element name="P_Client" type="xsd:string"/>
          <xsd:element name="P_CodeTarif" type="xsd:string"/>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_PrixArticle" type="s0:tListe_PrixArticle"/>
      <xsd:complexType name="tListe_PrixArticleResponse">
        <xsd:sequence>
          <xsd:element name="Liste_PrixArticleResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_PrixArticleResponse" type="s0:tListe_PrixArticleResponse"/>
      <xsd:complexType name="tListe_FamillesWEB">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FamillesWEB" type="s0:tListe_FamillesWEB"/>
      <xsd:complexType name="tListe_FamillesWEBResponse">
        <xsd:sequence>
          <xsd:element name="Liste_FamillesWEBResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FamillesWEBResponse" type="s0:tListe_FamillesWEBResponse"/>
      <xsd:complexType name="tListe_NewDocWEB">
        <xsd:sequence>
          <xsd:element name="P_IDRepr" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_NewDocWEB" type="s0:tListe_NewDocWEB"/>
      <xsd:complexType name="tListe_NewDocWEBResponse">
        <xsd:sequence>
          <xsd:element name="Liste_NewDocWEBResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_NewDocWEBResponse" type="s0:tListe_NewDocWEBResponse"/>
      <xsd:complexType name="tModif_DocWeb">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Modif_DocWeb" type="s0:tModif_DocWeb"/>
      <xsd:complexType name="tModif_DocWebResponse">
        <xsd:sequence>
          <xsd:element name="Modif_DocWebResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Modif_DocWebResponse" type="s0:tModif_DocWebResponse"/>
      <xsd:complexType name="tNotifications_Nb">
        <xsd:sequence>
          <xsd:element name="P_IDRepr" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Notifications_Nb" type="s0:tNotifications_Nb"/>
      <xsd:complexType name="tNotifications_NbResponse">
        <xsd:sequence>
          <xsd:element name="Notifications_NbResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Notifications_NbResponse" type="s0:tNotifications_NbResponse"/>
      <xsd:complexType name="tNotifications_Liste">
        <xsd:sequence>
          <xsd:element name="P_IDRepr" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Notifications_Liste" type="s0:tNotifications_Liste"/>
      <xsd:complexType name="tNotifications_ListeResponse">
        <xsd:sequence>
          <xsd:element name="Notifications_ListeResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Notifications_ListeResponse" type="s0:tNotifications_ListeResponse"/>
      <xsd:complexType name="tListe_Doccom_EasyTablet">
        <xsd:sequence>
          <xsd:element name="P_TypeDoc" type="xsd:string"/>
          <xsd:element name="P_NumDoc" type="xsd:string"/>
          <xsd:element name="P_CodeClient" type="xsd:string"/>
          <xsd:element name="P_Date" type="xsd:string"/>
          <xsd:element name="P_IDRepr" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Doccom_EasyTablet" type="s0:tListe_Doccom_EasyTablet"/>
      <xsd:complexType name="tListe_Doccom_EasyTabletResponse">
        <xsd:sequence>
          <xsd:element name="Liste_Doccom_EasyTabletResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Doccom_EasyTabletResponse" type="s0:tListe_Doccom_EasyTabletResponse"/>
      <xsd:complexType name="tWebHook_Test">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="WebHook_Test" type="s0:tWebHook_Test"/>
      <xsd:complexType name="tWebHook_TestResponse"/>
      <xsd:element name="WebHook_TestResponse" type="s0:tWebHook_TestResponse"/>
      <xsd:complexType name="tListe_Transporteurs_v2">
        <xsd:sequence>
          <xsd:element name="P_IDClient" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Transporteurs_v2" type="s0:tListe_Transporteurs_v2"/>
      <xsd:complexType name="tListe_Transporteurs_v2Response">
        <xsd:sequence>
          <xsd:element name="Liste_Transporteurs_v2Result" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Transporteurs_v2Response" type="s0:tListe_Transporteurs_v2Response"/>
      <xsd:complexType name="tListe_PrixCondition_Modif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_IDTermMobil" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_PrixCondition_Modif" type="s0:tListe_PrixCondition_Modif"/>
      <xsd:complexType name="tListe_PrixCondition_ModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_PrixCondition_ModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_PrixCondition_ModifResponse" type="s0:tListe_PrixCondition_ModifResponse"/>
      <xsd:complexType name="tConnexion">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Connexion" type="s0:tConnexion"/>
      <xsd:complexType name="tConnexionResponse">
        <xsd:sequence>
          <xsd:element name="ConnexionResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="ConnexionResponse" type="s0:tConnexionResponse"/>
      <xsd:complexType name="tInfos_UnArticle">
        <xsd:sequence>
          <xsd:element name="P_Identifiant" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Infos_UnArticle" type="s0:tInfos_UnArticle"/>
      <xsd:complexType name="tInfos_UnArticleResponse">
        <xsd:sequence>
          <xsd:element name="Infos_UnArticleResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Infos_UnArticleResponse" type="s0:tInfos_UnArticleResponse"/>
      <xsd:complexType name="tImport_CommentDocCom">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_CommentDocCom" type="s0:tImport_CommentDocCom"/>
      <xsd:complexType name="tImport_CommentDocComResponse">
        <xsd:sequence>
          <xsd:element name="Import_CommentDocComResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_CommentDocComResponse" type="s0:tImport_CommentDocComResponse"/>
      <xsd:complexType name="tComment_DocCom">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Comment_DocCom" type="s0:tComment_DocCom"/>
      <xsd:complexType name="tComment_DocComResponse">
        <xsd:sequence>
          <xsd:element name="Comment_DocComResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Comment_DocComResponse" type="s0:tComment_DocComResponse"/>
      <xsd:complexType name="tListe_NewDocAUTO">
        <xsd:sequence>
          <xsd:element name="P_IDRepr" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_NewDocAUTO" type="s0:tListe_NewDocAUTO"/>
      <xsd:complexType name="tListe_NewDocAUTOResponse">
        <xsd:sequence>
          <xsd:element name="Liste_NewDocAUTOResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_NewDocAUTOResponse" type="s0:tListe_NewDocAUTOResponse"/>
      <xsd:complexType name="tModif_DocAuto">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Modif_DocAuto" type="s0:tModif_DocAuto"/>
      <xsd:complexType name="tModif_DocAutoResponse">
        <xsd:sequence>
          <xsd:element name="Modif_DocAutoResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Modif_DocAutoResponse" type="s0:tModif_DocAutoResponse"/>
      <xsd:complexType name="tInit_Connexion_BackOffice"/>
      <xsd:element name="Init_Connexion_BackOffice" type="s0:tInit_Connexion_BackOffice"/>
      <xsd:complexType name="tInit_Connexion_BackOfficeResponse"/>
      <xsd:element name="Init_Connexion_BackOfficeResponse" type="s0:tInit_Connexion_BackOfficeResponse"/>
      <xsd:complexType name="tListe_Lignes_BonPrepa_SAGE">
        <xsd:sequence>
          <xsd:element name="P_IDDoc" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Lignes_BonPrepa_SAGE" type="s0:tListe_Lignes_BonPrepa_SAGE"/>
      <xsd:complexType name="tListe_Lignes_BonPrepa_SAGEResponse">
        <xsd:sequence>
          <xsd:element name="Liste_Lignes_BonPrepa_SAGEResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Lignes_BonPrepa_SAGEResponse" type="s0:tListe_Lignes_BonPrepa_SAGEResponse"/>
      <xsd:complexType name="tCherche_Liste_Article">
        <xsd:sequence>
          <xsd:element name="P_CritRech" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Cherche_Liste_Article" type="s0:tCherche_Liste_Article"/>
      <xsd:complexType name="tCherche_Liste_ArticleResponse">
        <xsd:sequence>
          <xsd:element name="Cherche_Liste_ArticleResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Cherche_Liste_ArticleResponse" type="s0:tCherche_Liste_ArticleResponse"/>
      <xsd:complexType name="tListe_Lignes_Panier_Ruptures">
        <xsd:sequence>
          <xsd:element name="P_IDClient" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Lignes_Panier_Ruptures" type="s0:tListe_Lignes_Panier_Ruptures"/>
      <xsd:complexType name="tListe_Lignes_Panier_RupturesResponse">
        <xsd:sequence>
          <xsd:element name="Liste_Lignes_Panier_RupturesResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Lignes_Panier_RupturesResponse" type="s0:tListe_Lignes_Panier_RupturesResponse"/>
      <xsd:complexType name="tImport_Panier_Ligne">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_Panier_Ligne" type="s0:tImport_Panier_Ligne"/>
      <xsd:complexType name="tImport_Panier_LigneResponse">
        <xsd:sequence>
          <xsd:element name="Import_Panier_LigneResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_Panier_LigneResponse" type="s0:tImport_Panier_LigneResponse"/>
      <xsd:complexType name="tRetrait_Panier_Ligne">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Retrait_Panier_Ligne" type="s0:tRetrait_Panier_Ligne"/>
      <xsd:complexType name="tRetrait_Panier_LigneResponse">
        <xsd:sequence>
          <xsd:element name="Retrait_Panier_LigneResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Retrait_Panier_LigneResponse" type="s0:tRetrait_Panier_LigneResponse"/>
      <xsd:complexType name="tListe_Paniers">
        <xsd:sequence>
          <xsd:element name="P_IDRepresentant" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Paniers" type="s0:tListe_Paniers"/>
      <xsd:complexType name="tListe_PaniersResponse">
        <xsd:sequence>
          <xsd:element name="Liste_PaniersResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_PaniersResponse" type="s0:tListe_PaniersResponse"/>
      <xsd:complexType name="tEtat_Panier_Ruptures">
        <xsd:sequence>
          <xsd:element name="P_IDRepresentant" type="xsd:string"/>
          <xsd:element name="P_IDClient" type="xsd:string"/>
          <xsd:element name="P_IDPtVente" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Etat_Panier_Ruptures" type="s0:tEtat_Panier_Ruptures"/>
      <xsd:complexType name="tEtat_Panier_RupturesResponse">
        <xsd:sequence>
          <xsd:element name="Etat_Panier_RupturesResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Etat_Panier_RupturesResponse" type="s0:tEtat_Panier_RupturesResponse"/>
      <xsd:complexType name="tModif_Panier_Ligne">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Modif_Panier_Ligne" type="s0:tModif_Panier_Ligne"/>
      <xsd:complexType name="tModif_Panier_LigneResponse">
        <xsd:sequence>
          <xsd:element name="Modif_Panier_LigneResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Modif_Panier_LigneResponse" type="s0:tModif_Panier_LigneResponse"/>
      <xsd:complexType name="tListe_DocSto_EasyTablet">
        <xsd:sequence>
          <xsd:element name="P_TypeDoc" type="xsd:string"/>
          <xsd:element name="P_NumDoc" type="xsd:string"/>
          <xsd:element name="P_CodeClient" type="xsd:string"/>
          <xsd:element name="P_Date" type="xsd:string"/>
          <xsd:element name="P_IDRepr" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_DocSto_EasyTablet" type="s0:tListe_DocSto_EasyTablet"/>
      <xsd:complexType name="tListe_DocSto_EasyTabletResponse">
        <xsd:sequence>
          <xsd:element name="Liste_DocSto_EasyTabletResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_DocSto_EasyTabletResponse" type="s0:tListe_DocSto_EasyTabletResponse"/>
      <xsd:complexType name="tListe_FichCliPARTModif">
        <xsd:sequence>
          <xsd:element name="P_LastSynchro" type="xsd:string"/>
          <xsd:element name="P_IDSite" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FichCliPARTModif" type="s0:tListe_FichCliPARTModif"/>
      <xsd:complexType name="tListe_FichCliPARTModifResponse">
        <xsd:sequence>
          <xsd:element name="Liste_FichCliPARTModifResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_FichCliPARTModifResponse" type="s0:tListe_FichCliPARTModifResponse"/>
      <xsd:complexType name="tRetrait_Panier">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Retrait_Panier" type="s0:tRetrait_Panier"/>
      <xsd:complexType name="tRetrait_PanierResponse">
        <xsd:sequence>
          <xsd:element name="Retrait_PanierResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Retrait_PanierResponse" type="s0:tRetrait_PanierResponse"/>
      <xsd:complexType name="tListe_LotsDLUO_ClientsArticle">
        <xsd:sequence>
          <xsd:element name="P_IDClient" type="xsd:string"/>
          <xsd:element name="p_CodeArticle_BO" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LotsDLUO_ClientsArticle" type="s0:tListe_LotsDLUO_ClientsArticle"/>
      <xsd:complexType name="tListe_LotsDLUO_ClientsArticleResponse">
        <xsd:sequence>
          <xsd:element name="Liste_LotsDLUO_ClientsArticleResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_LotsDLUO_ClientsArticleResponse" type="s0:tListe_LotsDLUO_ClientsArticleResponse"/>
      <xsd:complexType name="tImport_FAV_Clients">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_FAV_Clients" type="s0:tImport_FAV_Clients"/>
      <xsd:complexType name="tImport_FAV_ClientsResponse">
        <xsd:sequence>
          <xsd:element name="Import_FAV_ClientsResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_FAV_ClientsResponse" type="s0:tImport_FAV_ClientsResponse"/>
      <xsd:complexType name="tListe_ParamWebService"/>
      <xsd:element name="Liste_ParamWebService" type="s0:tListe_ParamWebService"/>
      <xsd:complexType name="tListe_ParamWebServiceResponse">
        <xsd:sequence>
          <xsd:element name="Liste_ParamWebServiceResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_ParamWebServiceResponse" type="s0:tListe_ParamWebServiceResponse"/>
      <xsd:complexType name="tListe_Transporteurs_MVWeb">
        <xsd:sequence>
          <xsd:element name="P_IDClient" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Transporteurs_MVWeb" type="s0:tListe_Transporteurs_MVWeb"/>
      <xsd:complexType name="tListe_Transporteurs_MVWebResponse">
        <xsd:sequence>
          <xsd:element name="Liste_Transporteurs_MVWebResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Transporteurs_MVWebResponse" type="s0:tListe_Transporteurs_MVWebResponse"/>
      <xsd:complexType name="tListe_Lignes_CmdeAchat_IDS">
        <xsd:sequence>
          <xsd:element name="P_IDDoc" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Lignes_CmdeAchat_IDS" type="s0:tListe_Lignes_CmdeAchat_IDS"/>
      <xsd:complexType name="tListe_Lignes_CmdeAchat_IDSResponse">
        <xsd:sequence>
          <xsd:element name="Liste_Lignes_CmdeAchat_IDSResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Lignes_CmdeAchat_IDSResponse" type="s0:tListe_Lignes_CmdeAchat_IDSResponse"/>
      <xsd:complexType name="tUtil_VersionAppli">
        <xsd:sequence>
          <xsd:element name="P_CodeAppli" type="xsd:string"/>
          <xsd:element name="P_VersionInst" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Util_VersionAppli" type="s0:tUtil_VersionAppli"/>
      <xsd:complexType name="tUtil_VersionAppliResponse">
        <xsd:sequence>
          <xsd:element name="Util_VersionAppliResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Util_VersionAppliResponse" type="s0:tUtil_VersionAppliResponse"/>
      <xsd:complexType name="tUtil_Infos_Serveur"/>
      <xsd:element name="Util_Infos_Serveur" type="s0:tUtil_Infos_Serveur"/>
      <xsd:complexType name="tUtil_Infos_ServeurResponse">
        <xsd:sequence>
          <xsd:element name="Util_Infos_ServeurResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Util_Infos_ServeurResponse" type="s0:tUtil_Infos_ServeurResponse"/>
      <xsd:complexType name="tImport_ContactClient">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_ContactClient" type="s0:tImport_ContactClient"/>
      <xsd:complexType name="tImport_ContactClientResponse">
        <xsd:sequence>
          <xsd:element name="Import_ContactClientResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_ContactClientResponse" type="s0:tImport_ContactClientResponse"/>
      <xsd:complexType name="tListe_Lignes_BOFacture">
        <xsd:sequence>
          <xsd:element name="P_CritRech" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Lignes_BOFacture" type="s0:tListe_Lignes_BOFacture"/>
      <xsd:complexType name="tListe_Lignes_BOFactureResponse">
        <xsd:sequence>
          <xsd:element name="Liste_Lignes_BOFactureResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_Lignes_BOFactureResponse" type="s0:tListe_Lignes_BOFactureResponse"/>
      <xsd:complexType name="tInit_Connexion_BackOffice_IDS"/>
      <xsd:element name="Init_Connexion_BackOffice_IDS" type="s0:tInit_Connexion_BackOffice_IDS"/>
      <xsd:complexType name="tInit_Connexion_BackOffice_IDSResponse"/>
      <xsd:element name="Init_Connexion_BackOffice_IDSResponse" type="s0:tInit_Connexion_BackOffice_IDSResponse"/>
      <xsd:complexType name="tListe_CmdesAchat_PROGINOV">
        <xsd:sequence>
          <xsd:element name="P_IDDossier" type="xsd:string"/>
          <xsd:element name="P_DateRef" type="xsd:string"/>
          <xsd:element name="P_Statut" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_CmdesAchat_PROGINOV" type="s0:tListe_CmdesAchat_PROGINOV"/>
      <xsd:complexType name="tListe_CmdesAchat_PROGINOVResponse">
        <xsd:sequence>
          <xsd:element name="Liste_CmdesAchat_PROGINOVResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_CmdesAchat_PROGINOVResponse" type="s0:tListe_CmdesAchat_PROGINOVResponse"/>
      <xsd:complexType name="tListe_CmdesAchatLignes_PROGINOV">
        <xsd:sequence>
          <xsd:element name="P_IDDossier" type="xsd:string"/>
          <xsd:element name="P_NumCmde" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_CmdesAchatLignes_PROGINOV" type="s0:tListe_CmdesAchatLignes_PROGINOV"/>
      <xsd:complexType name="tListe_CmdesAchatLignes_PROGINOVResponse">
        <xsd:sequence>
          <xsd:element name="Liste_CmdesAchatLignes_PROGINOVResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_CmdesAchatLignes_PROGINOVResponse" type="s0:tListe_CmdesAchatLignes_PROGINOVResponse"/>
      <xsd:complexType name="tPalettes_DocCom">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Palettes_DocCom" type="s0:tPalettes_DocCom"/>
      <xsd:complexType name="tPalettes_DocComResponse">
        <xsd:sequence>
          <xsd:element name="Palettes_DocComResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Palettes_DocComResponse" type="s0:tPalettes_DocComResponse"/>
      <xsd:complexType name="tImport_Palettes_DocCom">
        <xsd:sequence>
          <xsd:element name="P_Data" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_Palettes_DocCom" type="s0:tImport_Palettes_DocCom"/>
      <xsd:complexType name="tImport_Palettes_DocComResponse">
        <xsd:sequence>
          <xsd:element name="Import_Palettes_DocComResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Import_Palettes_DocComResponse" type="s0:tImport_Palettes_DocComResponse"/>
      <xsd:complexType name="tListe_BonLiv_SAGE">
        <xsd:sequence>
          <xsd:element name="P_DateRef" type="xsd:string"/>
          <xsd:element name="P_Type" type="xsd:string"/>
          <xsd:element name="P_Statut" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_BonLiv_SAGE" type="s0:tListe_BonLiv_SAGE"/>
      <xsd:complexType name="tListe_BonLiv_SAGEResponse">
        <xsd:sequence>
          <xsd:element name="Liste_BonLiv_SAGEResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_BonLiv_SAGEResponse" type="s0:tListe_BonLiv_SAGEResponse"/>
      <xsd:complexType name="tListe_BonLivLignes_SAGE">
        <xsd:sequence>
          <xsd:element name="P_NumBonLiv" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_BonLivLignes_SAGE" type="s0:tListe_BonLivLignes_SAGE"/>
      <xsd:complexType name="tListe_BonLivLignes_SAGEResponse">
        <xsd:sequence>
          <xsd:element name="Liste_BonLivLignes_SAGEResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_BonLivLignes_SAGEResponse" type="s0:tListe_BonLivLignes_SAGEResponse"/>
      <xsd:complexType name="tListe_DocVente_SAGE">
        <xsd:sequence>
          <xsd:element name="P_DateRef" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_DocVente_SAGE" type="s0:tListe_DocVente_SAGE"/>
      <xsd:complexType name="tListe_DocVente_SAGEResponse">
        <xsd:sequence>
          <xsd:element name="Liste_DocVente_SAGEResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_DocVente_SAGEResponse" type="s0:tListe_DocVente_SAGEResponse"/>
      <xsd:complexType name="tListe_DocVenteLignes_SAGE">
        <xsd:sequence>
          <xsd:element name="P_DateRef" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_DocVenteLignes_SAGE" type="s0:tListe_DocVenteLignes_SAGE"/>
      <xsd:complexType name="tListe_DocVenteLignes_SAGEResponse">
        <xsd:sequence>
          <xsd:element name="Liste_DocVenteLignes_SAGEResult" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:element name="Liste_DocVenteLignes_SAGEResponse" type="s0:tListe_DocVenteLignes_SAGEResponse"/>
    </xsd:schema>
  </types>
  <message name="WebServ_EasyTablet_Liste_Articles_MessageIn">
    <part name="parameters" element="s0:Liste_Articles"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Articles_MessageOut">
    <part name="parameters" element="s0:Liste_ArticlesResponse"/>
  </message>
  <message name="WebServ_EasyTablet_StockDispo_Articles_MessageIn">
    <part name="parameters" element="s0:StockDispo_Articles"/>
  </message>
  <message name="WebServ_EasyTablet_StockDispo_Articles_MessageOut">
    <part name="parameters" element="s0:StockDispo_ArticlesResponse"/>
  </message>
  <message name="WebServ_EasyTablet_StockDispo_UnArticle_MessageIn">
    <part name="parameters" element="s0:StockDispo_UnArticle"/>
  </message>
  <message name="WebServ_EasyTablet_StockDispo_UnArticle_MessageOut">
    <part name="parameters" element="s0:StockDispo_UnArticleResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_RDVHebdo_MessageIn">
    <part name="parameters" element="s0:Liste_RDVHebdo"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_RDVHebdo_MessageOut">
    <part name="parameters" element="s0:Liste_RDVHebdoResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LotsStock_Articles_MessageIn">
    <part name="parameters" element="s0:Liste_LotsStock_Articles"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LotsStock_Articles_MessageOut">
    <part name="parameters" element="s0:Liste_LotsStock_ArticlesResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_DocCom_MessageIn">
    <part name="parameters" element="s0:Import_DocCom"/>
  </message>
  <message name="WebServ_EasyTablet_Import_DocCom_MessageOut">
    <part name="parameters" element="s0:Import_DocComResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Etat_DocCom_MessageIn">
    <part name="parameters" element="s0:Etat_DocCom"/>
  </message>
  <message name="WebServ_EasyTablet_Etat_DocCom_MessageOut">
    <part name="parameters" element="s0:Etat_DocComResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_ParamGeneModif_MessageIn">
    <part name="parameters" element="s0:Liste_ParamGeneModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_ParamGeneModif_MessageOut">
    <part name="parameters" element="s0:Liste_ParamGeneModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_ParamArtModif_MessageIn">
    <part name="parameters" element="s0:Liste_ParamArtModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_ParamArtModif_MessageOut">
    <part name="parameters" element="s0:Liste_ParamArtModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LiensArtModif_MessageIn">
    <part name="parameters" element="s0:Liste_LiensArtModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LiensArtModif_MessageOut">
    <part name="parameters" element="s0:Liste_LiensArtModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_ParamCliModif_MessageIn">
    <part name="parameters" element="s0:Liste_ParamCliModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_ParamCliModif_MessageOut">
    <part name="parameters" element="s0:Liste_ParamCliModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_FichCliModif_MessageIn">
    <part name="parameters" element="s0:Liste_FichCliModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_FichCliModif_MessageOut">
    <part name="parameters" element="s0:Liste_FichCliModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LiensCliModif_MessageIn">
    <part name="parameters" element="s0:Liste_LiensCliModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LiensCliModif_MessageOut">
    <part name="parameters" element="s0:Liste_LiensCliModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_ReprModif_MessageIn">
    <part name="parameters" element="s0:Liste_ReprModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_ReprModif_MessageOut">
    <part name="parameters" element="s0:Liste_ReprModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_TarifsModif_MessageIn">
    <part name="parameters" element="s0:Liste_TarifsModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_TarifsModif_MessageOut">
    <part name="parameters" element="s0:Liste_TarifsModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_DataGPS_MessageIn">
    <part name="parameters" element="s0:Import_DataGPS"/>
  </message>
  <message name="WebServ_EasyTablet_Import_DataGPS_MessageOut">
    <part name="parameters" element="s0:Import_DataGPSResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LotsModif_MessageIn">
    <part name="parameters" element="s0:Liste_LotsModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LotsModif_MessageOut">
    <part name="parameters" element="s0:Liste_LotsModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_TarifsModif_bis_MessageIn">
    <part name="parameters" element="s0:Liste_TarifsModif_bis"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_TarifsModif_bis_MessageOut">
    <part name="parameters" element="s0:Liste_TarifsModif_bisResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_TarifsModif_ter_MessageIn">
    <part name="parameters" element="s0:Liste_TarifsModif_ter"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_TarifsModif_ter_MessageOut">
    <part name="parameters" element="s0:Liste_TarifsModif_terResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_FichArtModif_v2_MessageIn">
    <part name="parameters" element="s0:Liste_FichArtModif_v2"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_FichArtModif_v2_MessageOut">
    <part name="parameters" element="s0:Liste_FichArtModif_v2Response"/>
  </message>
  <message name="WebServ_EasyTablet_Import_DocSto_MessageIn">
    <part name="parameters" element="s0:Import_DocSto"/>
  </message>
  <message name="WebServ_EasyTablet_Import_DocSto_MessageOut">
    <part name="parameters" element="s0:Import_DocStoResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Etat_DocSto_MessageIn">
    <part name="parameters" element="s0:Etat_DocSto"/>
  </message>
  <message name="WebServ_EasyTablet_Etat_DocSto_MessageOut">
    <part name="parameters" element="s0:Etat_DocStoResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Encours_Clients_MessageIn">
    <part name="parameters" element="s0:Encours_Clients"/>
  </message>
  <message name="WebServ_EasyTablet_Encours_Clients_MessageOut">
    <part name="parameters" element="s0:Encours_ClientsResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_DocStoModif_MessageIn">
    <part name="parameters" element="s0:Liste_DocStoModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_DocStoModif_MessageOut">
    <part name="parameters" element="s0:Liste_DocStoModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Export_DocSto_MessageIn">
    <part name="parameters" element="s0:Export_DocSto"/>
  </message>
  <message name="WebServ_EasyTablet_Export_DocSto_MessageOut">
    <part name="parameters" element="s0:Export_DocStoResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_UtilModif_MessageIn">
    <part name="parameters" element="s0:Liste_UtilModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_UtilModif_MessageOut">
    <part name="parameters" element="s0:Liste_UtilModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_DocSto_Modif_MessageIn">
    <part name="parameters" element="s0:Import_DocSto_Modif"/>
  </message>
  <message name="WebServ_EasyTablet_Import_DocSto_Modif_MessageOut">
    <part name="parameters" element="s0:Import_DocSto_ModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_UtilStock_MessageIn">
    <part name="parameters" element="s0:Liste_UtilStock"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_UtilStock_MessageOut">
    <part name="parameters" element="s0:Liste_UtilStockResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LotsStock_Articles_All_MessageIn">
    <part name="parameters" element="s0:Liste_LotsStock_Articles_All"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LotsStock_Articles_All_MessageOut">
    <part name="parameters" element="s0:Liste_LotsStock_Articles_AllResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LiensArtModif_All_MessageIn">
    <part name="parameters" element="s0:Liste_LiensArtModif_All"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LiensArtModif_All_MessageOut">
    <part name="parameters" element="s0:Liste_LiensArtModif_AllResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_FichCliModif_All_MessageIn">
    <part name="parameters" element="s0:Liste_FichCliModif_All"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_FichCliModif_All_MessageOut">
    <part name="parameters" element="s0:Liste_FichCliModif_AllResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_FichArtModif_All_MessageIn">
    <part name="parameters" element="s0:Liste_FichArtModif_All"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_FichArtModif_All_MessageOut">
    <part name="parameters" element="s0:Liste_FichArtModif_AllResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Email_DocCom_MessageIn">
    <part name="parameters" element="s0:Email_DocCom"/>
  </message>
  <message name="WebServ_EasyTablet_Email_DocCom_MessageOut">
    <part name="parameters" element="s0:Email_DocComResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LotsModif_All_MessageIn">
    <part name="parameters" element="s0:Liste_LotsModif_All"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LotsModif_All_MessageOut">
    <part name="parameters" element="s0:Liste_LotsModif_AllResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_DetLotArtModif_All_MessageIn">
    <part name="parameters" element="s0:Liste_DetLotArtModif_All"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_DetLotArtModif_All_MessageOut">
    <part name="parameters" element="s0:Liste_DetLotArtModif_AllResponse"/>
  </message>
  <message name="WebServ_EasyTablet_OuvreFichierLOG_MessageIn">
    <part name="parameters" element="s0:OuvreFichierLOG"/>
  </message>
  <message name="WebServ_EasyTablet_OuvreFichierLOG_MessageOut">
    <part name="parameters" element="s0:OuvreFichierLOGResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Ecrit_LOG_MessageIn">
    <part name="parameters" element="s0:Ecrit_LOG"/>
  </message>
  <message name="WebServ_EasyTablet_Ecrit_LOG_MessageOut">
    <part name="parameters" element="s0:Ecrit_LOGResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LotsStock_Articles_v2_MessageIn">
    <part name="parameters" element="s0:Liste_LotsStock_Articles_v2"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LotsStock_Articles_v2_MessageOut">
    <part name="parameters" element="s0:Liste_LotsStock_Articles_v2Response"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_TarifsModif_optim_MessageIn">
    <part name="parameters" element="s0:Liste_TarifsModif_optim"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_TarifsModif_optim_MessageOut">
    <part name="parameters" element="s0:Liste_TarifsModif_optimResponse"/>
  </message>
  <message name="WebServ_EasyTablet_StockDispo_ListeArticles_MessageIn">
    <part name="parameters" element="s0:StockDispo_ListeArticles"/>
  </message>
  <message name="WebServ_EasyTablet_StockDispo_ListeArticles_MessageOut">
    <part name="parameters" element="s0:StockDispo_ListeArticlesResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_CDB_MessageIn">
    <part name="parameters" element="s0:Import_CDB"/>
  </message>
  <message name="WebServ_EasyTablet_Import_CDB_MessageOut">
    <part name="parameters" element="s0:Import_CDBResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_DLUO_MessageIn">
    <part name="parameters" element="s0:Import_DLUO"/>
  </message>
  <message name="WebServ_EasyTablet_Import_DLUO_MessageOut">
    <part name="parameters" element="s0:Import_DLUOResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Modif_DocSto_MessageIn">
    <part name="parameters" element="s0:Modif_DocSto"/>
  </message>
  <message name="WebServ_EasyTablet_Modif_DocSto_MessageOut">
    <part name="parameters" element="s0:Modif_DocStoResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_BacsPrepa_MessageIn">
    <part name="parameters" element="s0:Liste_BacsPrepa"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_BacsPrepa_MessageOut">
    <part name="parameters" element="s0:Liste_BacsPrepaResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_BonPrepa_Bac_MessageIn">
    <part name="parameters" element="s0:Liste_BonPrepa_Bac"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_BonPrepa_Bac_MessageOut">
    <part name="parameters" element="s0:Liste_BonPrepa_BacResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Lignes_BonPrepa_MessageIn">
    <part name="parameters" element="s0:Liste_Lignes_BonPrepa"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Lignes_BonPrepa_MessageOut">
    <part name="parameters" element="s0:Liste_Lignes_BonPrepaResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_QuiPrepa_MessageIn">
    <part name="parameters" element="s0:Import_QuiPrepa"/>
  </message>
  <message name="WebServ_EasyTablet_Import_QuiPrepa_MessageOut">
    <part name="parameters" element="s0:Import_QuiPrepaResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_StatutDocCom_MessageIn">
    <part name="parameters" element="s0:Import_StatutDocCom"/>
  </message>
  <message name="WebServ_EasyTablet_Import_StatutDocCom_MessageOut">
    <part name="parameters" element="s0:Import_StatutDocComResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Preparateurs_MessageIn">
    <part name="parameters" element="s0:Liste_Preparateurs"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Preparateurs_MessageOut">
    <part name="parameters" element="s0:Liste_PreparateursResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Email_Palmares_MessageIn">
    <part name="parameters" element="s0:Email_Palmares"/>
  </message>
  <message name="WebServ_EasyTablet_Email_Palmares_MessageOut">
    <part name="parameters" element="s0:Email_PalmaresResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Adresse_Client_MessageIn">
    <part name="parameters" element="s0:Adresse_Client"/>
  </message>
  <message name="WebServ_EasyTablet_Adresse_Client_MessageOut">
    <part name="parameters" element="s0:Adresse_ClientResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Transfert_Ent_MessageIn">
    <part name="parameters" element="s0:Liste_Transfert_Ent"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Transfert_Ent_MessageOut">
    <part name="parameters" element="s0:Liste_Transfert_EntResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Lignes_Transfert_MessageIn">
    <part name="parameters" element="s0:Liste_Lignes_Transfert"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Lignes_Transfert_MessageOut">
    <part name="parameters" element="s0:Liste_Lignes_TransfertResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_StatutDocSto_MessageIn">
    <part name="parameters" element="s0:Import_StatutDocSto"/>
  </message>
  <message name="WebServ_EasyTablet_Import_StatutDocSto_MessageOut">
    <part name="parameters" element="s0:Import_StatutDocStoResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Trace_GPS_MessageIn">
    <part name="parameters" element="s0:Trace_GPS"/>
  </message>
  <message name="WebServ_EasyTablet_Trace_GPS_MessageOut">
    <part name="parameters" element="s0:Trace_GPSResponse"/>
  </message>
  <message name="WebServ_EasyTablet_BalanceAgee_UnClient_MessageIn">
    <part name="parameters" element="s0:BalanceAgee_UnClient"/>
  </message>
  <message name="WebServ_EasyTablet_BalanceAgee_UnClient_MessageOut">
    <part name="parameters" element="s0:BalanceAgee_UnClientResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Util_DateHeure_Serveur_MessageIn">
    <part name="parameters" element="s0:Util_DateHeure_Serveur"/>
  </message>
  <message name="WebServ_EasyTablet_Util_DateHeure_Serveur_MessageOut">
    <part name="parameters" element="s0:Util_DateHeure_ServeurResponse"/>
  </message>
  <message name="WebServ_EasyTablet_CadencierPrdt_Client_MessageIn">
    <part name="parameters" element="s0:CadencierPrdt_Client"/>
  </message>
  <message name="WebServ_EasyTablet_CadencierPrdt_Client_MessageOut">
    <part name="parameters" element="s0:CadencierPrdt_ClientResponse"/>
  </message>
  <message name="WebServ_EasyTablet_ConnexionWeb_MessageIn">
    <part name="parameters" element="s0:ConnexionWeb"/>
  </message>
  <message name="WebServ_EasyTablet_ConnexionWeb_MessageOut">
    <part name="parameters" element="s0:ConnexionWebResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Transporteurs_MessageIn">
    <part name="parameters" element="s0:Liste_Transporteurs"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Transporteurs_MessageOut">
    <part name="parameters" element="s0:Liste_TransporteursResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Familles_MessageIn">
    <part name="parameters" element="s0:Liste_Familles"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Familles_MessageOut">
    <part name="parameters" element="s0:Liste_FamillesResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_ArtStockModif_MessageIn">
    <part name="parameters" element="s0:Liste_ArtStockModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_ArtStockModif_MessageOut">
    <part name="parameters" element="s0:Liste_ArtStockModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_PrixArticle_MessageIn">
    <part name="parameters" element="s0:PrixArticle"/>
  </message>
  <message name="WebServ_EasyTablet_PrixArticle_MessageOut">
    <part name="parameters" element="s0:PrixArticleResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Modif_ConnexionWeb_MessageIn">
    <part name="parameters" element="s0:Modif_ConnexionWeb"/>
  </message>
  <message name="WebServ_EasyTablet_Modif_ConnexionWeb_MessageOut">
    <part name="parameters" element="s0:Modif_ConnexionWebResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_DocCom_MessageIn">
    <part name="parameters" element="s0:Liste_DocCom"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_DocCom_MessageOut">
    <part name="parameters" element="s0:Liste_DocComResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_PrixArticle_MessageIn">
    <part name="parameters" element="s0:Liste_PrixArticle"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_PrixArticle_MessageOut">
    <part name="parameters" element="s0:Liste_PrixArticleResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_FamillesWEB_MessageIn">
    <part name="parameters" element="s0:Liste_FamillesWEB"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_FamillesWEB_MessageOut">
    <part name="parameters" element="s0:Liste_FamillesWEBResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_NewDocWEB_MessageIn">
    <part name="parameters" element="s0:Liste_NewDocWEB"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_NewDocWEB_MessageOut">
    <part name="parameters" element="s0:Liste_NewDocWEBResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Modif_DocWeb_MessageIn">
    <part name="parameters" element="s0:Modif_DocWeb"/>
  </message>
  <message name="WebServ_EasyTablet_Modif_DocWeb_MessageOut">
    <part name="parameters" element="s0:Modif_DocWebResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Notifications_Nb_MessageIn">
    <part name="parameters" element="s0:Notifications_Nb"/>
  </message>
  <message name="WebServ_EasyTablet_Notifications_Nb_MessageOut">
    <part name="parameters" element="s0:Notifications_NbResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Notifications_Liste_MessageIn">
    <part name="parameters" element="s0:Notifications_Liste"/>
  </message>
  <message name="WebServ_EasyTablet_Notifications_Liste_MessageOut">
    <part name="parameters" element="s0:Notifications_ListeResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Doccom_EasyTablet_MessageIn">
    <part name="parameters" element="s0:Liste_Doccom_EasyTablet"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Doccom_EasyTablet_MessageOut">
    <part name="parameters" element="s0:Liste_Doccom_EasyTabletResponse"/>
  </message>
  <message name="WebServ_EasyTablet_WebHook_Test_MessageIn">
    <part name="parameters" element="s0:WebHook_Test"/>
  </message>
  <message name="WebServ_EasyTablet_WebHook_Test_MessageOut">
    <part name="parameters" element="s0:WebHook_TestResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Transporteurs_v2_MessageIn">
    <part name="parameters" element="s0:Liste_Transporteurs_v2"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Transporteurs_v2_MessageOut">
    <part name="parameters" element="s0:Liste_Transporteurs_v2Response"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_PrixCondition_Modif_MessageIn">
    <part name="parameters" element="s0:Liste_PrixCondition_Modif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_PrixCondition_Modif_MessageOut">
    <part name="parameters" element="s0:Liste_PrixCondition_ModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Connexion_MessageIn">
    <part name="parameters" element="s0:Connexion"/>
  </message>
  <message name="WebServ_EasyTablet_Connexion_MessageOut">
    <part name="parameters" element="s0:ConnexionResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Infos_UnArticle_MessageIn">
    <part name="parameters" element="s0:Infos_UnArticle"/>
  </message>
  <message name="WebServ_EasyTablet_Infos_UnArticle_MessageOut">
    <part name="parameters" element="s0:Infos_UnArticleResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_CommentDocCom_MessageIn">
    <part name="parameters" element="s0:Import_CommentDocCom"/>
  </message>
  <message name="WebServ_EasyTablet_Import_CommentDocCom_MessageOut">
    <part name="parameters" element="s0:Import_CommentDocComResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Comment_DocCom_MessageIn">
    <part name="parameters" element="s0:Comment_DocCom"/>
  </message>
  <message name="WebServ_EasyTablet_Comment_DocCom_MessageOut">
    <part name="parameters" element="s0:Comment_DocComResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_NewDocAUTO_MessageIn">
    <part name="parameters" element="s0:Liste_NewDocAUTO"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_NewDocAUTO_MessageOut">
    <part name="parameters" element="s0:Liste_NewDocAUTOResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Modif_DocAuto_MessageIn">
    <part name="parameters" element="s0:Modif_DocAuto"/>
  </message>
  <message name="WebServ_EasyTablet_Modif_DocAuto_MessageOut">
    <part name="parameters" element="s0:Modif_DocAutoResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Init_Connexion_BackOffice_MessageIn">
    <part name="parameters" element="s0:Init_Connexion_BackOffice"/>
  </message>
  <message name="WebServ_EasyTablet_Init_Connexion_BackOffice_MessageOut">
    <part name="parameters" element="s0:Init_Connexion_BackOfficeResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Lignes_BonPrepa_SAGE_MessageIn">
    <part name="parameters" element="s0:Liste_Lignes_BonPrepa_SAGE"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Lignes_BonPrepa_SAGE_MessageOut">
    <part name="parameters" element="s0:Liste_Lignes_BonPrepa_SAGEResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Cherche_Liste_Article_MessageIn">
    <part name="parameters" element="s0:Cherche_Liste_Article"/>
  </message>
  <message name="WebServ_EasyTablet_Cherche_Liste_Article_MessageOut">
    <part name="parameters" element="s0:Cherche_Liste_ArticleResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Lignes_Panier_Ruptures_MessageIn">
    <part name="parameters" element="s0:Liste_Lignes_Panier_Ruptures"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Lignes_Panier_Ruptures_MessageOut">
    <part name="parameters" element="s0:Liste_Lignes_Panier_RupturesResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_Panier_Ligne_MessageIn">
    <part name="parameters" element="s0:Import_Panier_Ligne"/>
  </message>
  <message name="WebServ_EasyTablet_Import_Panier_Ligne_MessageOut">
    <part name="parameters" element="s0:Import_Panier_LigneResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Retrait_Panier_Ligne_MessageIn">
    <part name="parameters" element="s0:Retrait_Panier_Ligne"/>
  </message>
  <message name="WebServ_EasyTablet_Retrait_Panier_Ligne_MessageOut">
    <part name="parameters" element="s0:Retrait_Panier_LigneResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Paniers_MessageIn">
    <part name="parameters" element="s0:Liste_Paniers"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Paniers_MessageOut">
    <part name="parameters" element="s0:Liste_PaniersResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Etat_Panier_Ruptures_MessageIn">
    <part name="parameters" element="s0:Etat_Panier_Ruptures"/>
  </message>
  <message name="WebServ_EasyTablet_Etat_Panier_Ruptures_MessageOut">
    <part name="parameters" element="s0:Etat_Panier_RupturesResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Modif_Panier_Ligne_MessageIn">
    <part name="parameters" element="s0:Modif_Panier_Ligne"/>
  </message>
  <message name="WebServ_EasyTablet_Modif_Panier_Ligne_MessageOut">
    <part name="parameters" element="s0:Modif_Panier_LigneResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_DocSto_EasyTablet_MessageIn">
    <part name="parameters" element="s0:Liste_DocSto_EasyTablet"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_DocSto_EasyTablet_MessageOut">
    <part name="parameters" element="s0:Liste_DocSto_EasyTabletResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_FichCliPARTModif_MessageIn">
    <part name="parameters" element="s0:Liste_FichCliPARTModif"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_FichCliPARTModif_MessageOut">
    <part name="parameters" element="s0:Liste_FichCliPARTModifResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Retrait_Panier_MessageIn">
    <part name="parameters" element="s0:Retrait_Panier"/>
  </message>
  <message name="WebServ_EasyTablet_Retrait_Panier_MessageOut">
    <part name="parameters" element="s0:Retrait_PanierResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LotsDLUO_ClientsArticle_MessageIn">
    <part name="parameters" element="s0:Liste_LotsDLUO_ClientsArticle"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_LotsDLUO_ClientsArticle_MessageOut">
    <part name="parameters" element="s0:Liste_LotsDLUO_ClientsArticleResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_FAV_Clients_MessageIn">
    <part name="parameters" element="s0:Import_FAV_Clients"/>
  </message>
  <message name="WebServ_EasyTablet_Import_FAV_Clients_MessageOut">
    <part name="parameters" element="s0:Import_FAV_ClientsResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_ParamWebService_MessageIn">
    <part name="parameters" element="s0:Liste_ParamWebService"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_ParamWebService_MessageOut">
    <part name="parameters" element="s0:Liste_ParamWebServiceResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Transporteurs_MVWeb_MessageIn">
    <part name="parameters" element="s0:Liste_Transporteurs_MVWeb"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Transporteurs_MVWeb_MessageOut">
    <part name="parameters" element="s0:Liste_Transporteurs_MVWebResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Lignes_CmdeAchat_IDS_MessageIn">
    <part name="parameters" element="s0:Liste_Lignes_CmdeAchat_IDS"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Lignes_CmdeAchat_IDS_MessageOut">
    <part name="parameters" element="s0:Liste_Lignes_CmdeAchat_IDSResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Util_VersionAppli_MessageIn">
    <part name="parameters" element="s0:Util_VersionAppli"/>
  </message>
  <message name="WebServ_EasyTablet_Util_VersionAppli_MessageOut">
    <part name="parameters" element="s0:Util_VersionAppliResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Util_Infos_Serveur_MessageIn">
    <part name="parameters" element="s0:Util_Infos_Serveur"/>
  </message>
  <message name="WebServ_EasyTablet_Util_Infos_Serveur_MessageOut">
    <part name="parameters" element="s0:Util_Infos_ServeurResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_ContactClient_MessageIn">
    <part name="parameters" element="s0:Import_ContactClient"/>
  </message>
  <message name="WebServ_EasyTablet_Import_ContactClient_MessageOut">
    <part name="parameters" element="s0:Import_ContactClientResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Lignes_BOFacture_MessageIn">
    <part name="parameters" element="s0:Liste_Lignes_BOFacture"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_Lignes_BOFacture_MessageOut">
    <part name="parameters" element="s0:Liste_Lignes_BOFactureResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Init_Connexion_BackOffice_IDS_MessageIn">
    <part name="parameters" element="s0:Init_Connexion_BackOffice_IDS"/>
  </message>
  <message name="WebServ_EasyTablet_Init_Connexion_BackOffice_IDS_MessageOut">
    <part name="parameters" element="s0:Init_Connexion_BackOffice_IDSResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_CmdesAchat_PROGINOV_MessageIn">
    <part name="parameters" element="s0:Liste_CmdesAchat_PROGINOV"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_CmdesAchat_PROGINOV_MessageOut">
    <part name="parameters" element="s0:Liste_CmdesAchat_PROGINOVResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_CmdesAchatLignes_PROGINOV_MessageIn">
    <part name="parameters" element="s0:Liste_CmdesAchatLignes_PROGINOV"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_CmdesAchatLignes_PROGINOV_MessageOut">
    <part name="parameters" element="s0:Liste_CmdesAchatLignes_PROGINOVResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Palettes_DocCom_MessageIn">
    <part name="parameters" element="s0:Palettes_DocCom"/>
  </message>
  <message name="WebServ_EasyTablet_Palettes_DocCom_MessageOut">
    <part name="parameters" element="s0:Palettes_DocComResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Import_Palettes_DocCom_MessageIn">
    <part name="parameters" element="s0:Import_Palettes_DocCom"/>
  </message>
  <message name="WebServ_EasyTablet_Import_Palettes_DocCom_MessageOut">
    <part name="parameters" element="s0:Import_Palettes_DocComResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_BonLiv_SAGE_MessageIn">
    <part name="parameters" element="s0:Liste_BonLiv_SAGE"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_BonLiv_SAGE_MessageOut">
    <part name="parameters" element="s0:Liste_BonLiv_SAGEResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_BonLivLignes_SAGE_MessageIn">
    <part name="parameters" element="s0:Liste_BonLivLignes_SAGE"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_BonLivLignes_SAGE_MessageOut">
    <part name="parameters" element="s0:Liste_BonLivLignes_SAGEResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_DocVente_SAGE_MessageIn">
    <part name="parameters" element="s0:Liste_DocVente_SAGE"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_DocVente_SAGE_MessageOut">
    <part name="parameters" element="s0:Liste_DocVente_SAGEResponse"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_DocVenteLignes_SAGE_MessageIn">
    <part name="parameters" element="s0:Liste_DocVenteLignes_SAGE"/>
  </message>
  <message name="WebServ_EasyTablet_Liste_DocVenteLignes_SAGE_MessageOut">
    <part name="parameters" element="s0:Liste_DocVenteLignes_SAGEResponse"/>
  </message>
  <portType name="WebServ_EasyTabletSOAPPortType">
    <operation name="Liste_Articles">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Articles (&amp;lt;p_PtVente&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;p_PtVente : &amp;lt;indiquez ici le r&amp;#244;le de p_PtVente&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Articles_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Articles_MessageOut"/>
    </operation>
    <operation name="StockDispo_Articles">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] StockDispo_Articles (&amp;lt;p_PtVente&amp;gt;, &amp;lt;P_LstArticles&amp;gt; est cha&amp;#238;ne)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;p_PtVente : ID du point de vente concern&amp;eacute;&lt;br /&gt;P_LstArticles (cha&amp;#238;ne) : Liste des ID articles s&amp;eacute;par&amp;eacute;s par une virgule &amp;quot;,&amp;quot;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_StockDispo_Articles_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_StockDispo_Articles_MessageOut"/>
    </operation>
    <operation name="StockDispo_UnArticle">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] StockDispo_UnArticle (&amp;lt;p_PtVente&amp;gt;, &amp;lt;p_IDArticle&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;p_PtVente : &amp;lt;indiquez ici le r&amp;#244;le de p_PtVente&amp;gt;&lt;br /&gt;p_IDArticle : &amp;lt;indiquez ici le r&amp;#244;le de p_LstArticles&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : &amp;lt;indiquez ici les valeurs possibles ainsi que leur interpr&amp;eacute;tation&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_StockDispo_UnArticle_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_StockDispo_UnArticle_MessageOut"/>
    </operation>
    <operation name="Liste_RDVHebdo">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_RDVHebdo (&amp;lt;P_IDRepr&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDRepr : &amp;lt;indiquez ici le r&amp;#244;le de P_IDRepr&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_RDVHebdo_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_RDVHebdo_MessageOut"/>
    </operation>
    <operation name="Liste_LotsStock_Articles">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_LotsStock_Articles (&amp;lt;p_PtVente&amp;gt;, &amp;lt;p_Repres&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;p_PtVente : &amp;lt;indiquez ici le r&amp;#244;le de p_PtVente&amp;gt;&lt;br /&gt;p_Repres : &amp;lt;indiquez ici le r&amp;#244;le de p_Repres&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_LotsStock_Articles_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_LotsStock_Articles_MessageOut"/>
    </operation>
    <operation name="Import_DocCom">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Import_DocCom (&amp;lt;P_DocCom&amp;gt;, &amp;lt;P_ClefCRC&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_DocCom : &amp;lt;indiquez ici le r&amp;#244;le de P_Liste_DocCom&amp;gt;&lt;br /&gt;P_ClefCRC : &amp;lt;indiquez ici le r&amp;#244;le de P_ClefCRC&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;Type ind&amp;eacute;termin&amp;eacute; : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_DocCom_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_DocCom_MessageOut"/>
    </operation>
    <operation name="Etat_DocCom">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Etat_DocCom (&amp;lt;P_Liste_DocCom&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Liste_DocCom : &amp;lt;indiquez ici le r&amp;#244;le de P_Liste_DocCom&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : &amp;lt;indiquez ici les valeurs possibles ainsi que leur interpr&amp;eacute;tation&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Etat_DocCom_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Etat_DocCom_MessageOut"/>
    </operation>
    <operation name="Liste_ParamGeneModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_ParamGeneModif (&amp;lt;P_LastSynchro&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_ParamGeneModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_ParamGeneModif_MessageOut"/>
    </operation>
    <operation name="Liste_ParamArtModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_ParamArtModif (&amp;lt;P_LastSynchro&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_ParamArtModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_ParamArtModif_MessageOut"/>
    </operation>
    <operation name="Liste_LiensArtModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_LiensArtModif (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_IDTermMobil&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_LiensArtModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_LiensArtModif_MessageOut"/>
    </operation>
    <operation name="Liste_ParamCliModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_ParamCliModif (&amp;lt;P_LastSynchro&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_ParamCliModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_ParamCliModif_MessageOut"/>
    </operation>
    <operation name="Liste_FichCliModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_FichCliModif (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_IDTermMobil&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_FichCliModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_FichCliModif_MessageOut"/>
    </operation>
    <operation name="Liste_LiensCliModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_LiensCliModif (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_IDTermMobil&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_LiensCliModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_LiensCliModif_MessageOut"/>
    </operation>
    <operation name="Liste_ReprModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_ReprModif (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_IDTermMobil&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_ReprModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_ReprModif_MessageOut"/>
    </operation>
    <operation name="Liste_TarifsModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_TarifsModif (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_IDTermMobil&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_TarifsModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_TarifsModif_MessageOut"/>
    </operation>
    <operation name="Import_DataGPS">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Import_DataGPS (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_DocCom&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_DataGPS_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_DataGPS_MessageOut"/>
    </operation>
    <operation name="Liste_LotsModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_LotsModif (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_IDTermMobil&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_LotsModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_LotsModif_MessageOut"/>
    </operation>
    <operation name="Liste_TarifsModif_bis">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_TarifsModif_bis (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_IDTermMobil&amp;gt;, &amp;lt;P_PtVente&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;P_PtVente : &amp;lt;indiquez ici le r&amp;#244;le de P_IDPointVente&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_TarifsModif_bis_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_TarifsModif_bis_MessageOut"/>
    </operation>
    <operation name="Liste_TarifsModif_ter">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_TarifsModif_ter (&amp;lt;P_DateDeb&amp;gt;, &amp;lt;P_DateFin&amp;gt;, &amp;lt;P_IDTermMobil&amp;gt;, &amp;lt;P_PtVente&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_DateDeb : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_DateFin : &amp;lt;indiquez ici le r&amp;#244;le de P_DateFin&amp;gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;P_PtVente : &amp;lt;indiquez ici le r&amp;#244;le de P_PtVente&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_TarifsModif_ter_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_TarifsModif_ter_MessageOut"/>
    </operation>
    <operation name="Liste_FichArtModif_v2">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_FichArtModif_v2 (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_IDTermMobil&amp;gt;, &amp;lt;P_Page&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;P_Page : &amp;lt;indiquez ici le r&amp;#244;le de nP_Page&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_FichArtModif_v2_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_FichArtModif_v2_MessageOut"/>
    </operation>
    <operation name="Import_DocSto">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Import_DocSto (&amp;lt;P_DocSto&amp;gt;, &amp;lt;P_Cl&amp;eacute;CRC&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_DocSto : &amp;lt;indiquez ici le r&amp;#244;le de P_DocSto&amp;gt;&lt;br /&gt;P_Cl&amp;eacute;CRC : &amp;lt;indiquez ici le r&amp;#244;le de P_Cl&amp;eacute;CRC&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;Type ind&amp;eacute;termin&amp;eacute; : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_DocSto_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_DocSto_MessageOut"/>
    </operation>
    <operation name="Etat_DocSto">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Etat_DocSto (&amp;lt;P_Liste_DocSto&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Liste_DocSto : &amp;lt;indiquez ici le r&amp;#244;le de P_Liste_DocSto&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Etat_DocSto_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Etat_DocSto_MessageOut"/>
    </operation>
    <operation name="Encours_Clients">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Encours_Clients (&amp;lt;P_IDRepr&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDRepr : &amp;lt;indiquez ici le r&amp;#244;le de P_IDRepr&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Encours_Clients_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Encours_Clients_MessageOut"/>
    </operation>
    <operation name="Liste_DocStoModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_DocStoModif (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_TypeDocSto&amp;gt;, &amp;lt;P_StatutMin&amp;gt;, &amp;lt;P_StatutMax&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_TypeDocSto : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;P_StatutMin : &amp;lt;indiquez ici le r&amp;#244;le de P_StatutMin&amp;gt;&lt;br /&gt;P_StatutMax : &amp;lt;indiquez ici le r&amp;#244;le de P_StatutMax&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_Page : &amp;lt;indiquez ici le r&amp;#244;le de P_Page&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_DocStoModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_DocStoModif_MessageOut"/>
    </operation>
    <operation name="Export_DocSto">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Export_DocSto (&amp;lt;P_NumDoc_Easy&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_NumDoc_Easy : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Export_DocSto_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Export_DocSto_MessageOut"/>
    </operation>
    <operation name="Liste_UtilModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_UtilModif (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_IDTermMobil&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_UtilModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_UtilModif_MessageOut"/>
    </operation>
    <operation name="Import_DocSto_Modif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Import_DocSto_Modif (&amp;lt;P_DocSto&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_DocSto : &amp;lt;indiquez ici le r&amp;#244;le de P_DocSto&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;Type ind&amp;eacute;termin&amp;eacute; : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_DocSto_Modif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_DocSto_Modif_MessageOut"/>
    </operation>
    <operation name="Liste_UtilStock">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_UtilStock ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_UtilStock_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_UtilStock_MessageOut"/>
    </operation>
    <operation name="Liste_LotsStock_Articles_All">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_LotsStock_Articles_All (&amp;lt;p_PtVente&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;p_PtVente : &amp;lt;indiquez ici le r&amp;#244;le de p_PtVente&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_LotsStock_Articles_All_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_LotsStock_Articles_All_MessageOut"/>
    </operation>
    <operation name="Liste_LiensArtModif_All">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_LiensArtModif_All (&amp;lt;P_LastSynchro&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_LiensArtModif_All_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_LiensArtModif_All_MessageOut"/>
    </operation>
    <operation name="Liste_FichCliModif_All">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_FichCliModif_All (&amp;lt;P_LastSynchro&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_FichCliModif_All_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_FichCliModif_All_MessageOut"/>
    </operation>
    <operation name="Liste_FichArtModif_All">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_FichArtModif_All (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_Page&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_Page : &amp;lt;indiquez ici le r&amp;#244;le de P_Page&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_FichArtModif_All_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_FichArtModif_All_MessageOut"/>
    </operation>
    <operation name="Email_DocCom">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Email_DocCom (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Email_DocCom_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Email_DocCom_MessageOut"/>
    </operation>
    <operation name="Liste_LotsModif_All">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_LotsModif_All (&amp;lt;P_LastSynchro&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_LotsModif_All_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_LotsModif_All_MessageOut"/>
    </operation>
    <operation name="Liste_DetLotArtModif_All">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_DetLotArtModif_All (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_Page&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_Page : &amp;lt;indiquez ici le r&amp;#244;le de P_Page&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_DetLotArtModif_All_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_DetLotArtModif_All_MessageOut"/>
    </operation>
    <operation name="OuvreFichierLOG">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;OuvreFichierLOG ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_OuvreFichierLOG_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_OuvreFichierLOG_MessageOut"/>
    </operation>
    <operation name="Ecrit_LOG">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Ecrit_LOG (&amp;lt;P_ZoneLOG&amp;gt; est cha&amp;#238;ne, &amp;lt;P_Message&amp;gt; est cha&amp;#238;ne)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_ZoneLOG (cha&amp;#238;ne ANSI) : &amp;lt;indiquez ici le r&amp;#244;le de Param1&amp;gt;&lt;br /&gt;P_Message (cha&amp;#238;ne ANSI) : &amp;lt;indiquez ici le r&amp;#244;le de Param2&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Ecrit_LOG_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Ecrit_LOG_MessageOut"/>
    </operation>
    <operation name="Liste_LotsStock_Articles_v2">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_LotsStock_Articles_v2 (&amp;lt;p_PtVente&amp;gt;, &amp;lt;p_Repres&amp;gt;, &amp;lt;p_LastSynchro&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;p_PtVente : &amp;lt;indiquez ici le r&amp;#244;le de p_PtVente&amp;gt;&lt;br /&gt;p_Repres : &amp;lt;indiquez ici le r&amp;#244;le de p_Repres&amp;gt;&lt;br /&gt;p_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de p_LastSynchro&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_LotsStock_Articles_v2_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_LotsStock_Articles_v2_MessageOut"/>
    </operation>
    <operation name="Liste_TarifsModif_optim">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_TarifsModif_optim (&amp;lt;P_DateDeb&amp;gt;, &amp;lt;P_DateFin&amp;gt;, &amp;lt;P_IDTermMobil&amp;gt;, &amp;lt;P_PtVente&amp;gt;, &amp;lt;P_Optim&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_DateDeb :&amp;lt;indiquez ici le r&amp;#244;le de P_DateDeb&amp;gt;&lt;br /&gt;P_DateFin :&amp;lt;indiquez ici le r&amp;#244;le de P_DateFin&amp;gt;&lt;br /&gt;P_IDTermMobil :&amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;P_PtVente :&amp;lt;indiquez ici le r&amp;#244;le de P_PtVente&amp;gt;&lt;br /&gt;P_Optim :&amp;lt;indiquez ici le r&amp;#244;le de P_Optim&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_TarifsModif_optim_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_TarifsModif_optim_MessageOut"/>
    </operation>
    <operation name="StockDispo_ListeArticles">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] StockDispo_ListeArticles (&amp;lt;P_LstArticles&amp;gt; est cha&amp;#238;ne)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LstArticles (cha&amp;#238;ne ANSI) : &amp;lt;indiquez ici le r&amp;#244;le de P_LstArticles&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;p_PtVente : &amp;lt;indiquez ici le r&amp;#244;le de p_PtVente&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_StockDispo_ListeArticles_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_StockDispo_ListeArticles_MessageOut"/>
    </operation>
    <operation name="Import_CDB">
      <documentation>R&amp;eacute;sum&amp;eacute; : Permet de remonter les infos sur les CDB au serveur EasyTablet&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Import_CDB (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_CDB_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_CDB_MessageOut"/>
    </operation>
    <operation name="Import_DLUO">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Import_DLUO (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_DLUO_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_DLUO_MessageOut"/>
    </operation>
    <operation name="Modif_DocSto">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Modif_DocSto (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_ID&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;sP_Etape (cha&amp;#238;ne ANSI) : &amp;lt;indiquez ici le r&amp;#244;le de P_Etape&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Modif_DocSto_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Modif_DocSto_MessageOut"/>
    </operation>
    <operation name="Liste_BacsPrepa">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_BacsPrepa (&amp;lt;P_IDEnt&amp;gt;, &amp;lt;P_IDUser&amp;gt;, &amp;lt;P_Statut&amp;gt;, &amp;lt;P_IDUtil&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDEnt :&amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDUser :&amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;P_Statut :&amp;lt;indiquez ici le r&amp;#244;le de P_Statut&amp;gt;&lt;br /&gt;P_IDUtil :&amp;lt;indiquez ici le r&amp;#244;le de P_IDUtil&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_IDUtil (entier - valeur par d&amp;eacute;faut=0) : &amp;lt;indiquez ici le r&amp;#244;le de P_IDUtil&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_BacsPrepa_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_BacsPrepa_MessageOut"/>
    </operation>
    <operation name="Liste_BonPrepa_Bac">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_BonPrepa_Bac (&amp;lt;P_IDBac&amp;gt;, &amp;lt;P_IDUser&amp;gt;, &amp;lt;P_Statut&amp;gt;, &amp;lt;P_OrderBy&amp;gt;, &amp;lt;P_OrderAscDesc&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDBac :&amp;lt;indiquez ici le r&amp;#244;le de P_IDEnt&amp;gt;&lt;br /&gt;P_IDUser :&amp;lt;indiquez ici le r&amp;#244;le de P_IDUser&amp;gt;&lt;br /&gt;P_Statut :&amp;lt;indiquez ici le r&amp;#244;le de P_Statut&amp;gt;&lt;br /&gt;P_OrderBy : &amp;lt;indiquez ici le r&amp;#244;le de P_OrderBy&amp;gt;&lt;br /&gt;P_OrderAscDesc : &amp;lt;indiquez ici le r&amp;#244;le de P_OrderAscDesc&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_BonPrepa_Bac_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_BonPrepa_Bac_MessageOut"/>
    </operation>
    <operation name="Liste_Lignes_BonPrepa">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Lignes_BonPrepa (&amp;lt;P_IDDoc&amp;gt;, &amp;lt;P_Ordre&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDDoc : &amp;lt;indiquez ici le r&amp;#244;le de Param1&amp;gt;&lt;br /&gt;P_Ordre : &amp;lt; indiquez ici le r&amp;#244;le de P_Ordre &amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : &amp;lt;indiquez ici le r&amp;#244;le de la valeur de retour&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;Param2 : &amp;lt;indiquez ici le r&amp;#244;le de Param2&amp;gt;&lt;br /&gt;Param3 : &amp;lt;indiquez ici le r&amp;#244;le de Param3&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Lignes_BonPrepa_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Lignes_BonPrepa_MessageOut"/>
    </operation>
    <operation name="Import_QuiPrepa">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Import_QuiPrepa (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_QuiPrepa_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_QuiPrepa_MessageOut"/>
    </operation>
    <operation name="Import_StatutDocCom">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Import_StatutDocCom (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data :&amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;Type ind&amp;eacute;termin&amp;eacute; : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_StatutDocCom_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_StatutDocCom_MessageOut"/>
    </operation>
    <operation name="Liste_Preparateurs">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Preparateurs (&amp;lt;P_IDEnt&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDEnt : &amp;lt;indiquez ici le r&amp;#244;le de P_IDEnt&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_IDUser : &amp;lt;indiquez ici le r&amp;#244;le de P_IDUser&amp;gt;&lt;br /&gt;P_Statut : &amp;lt;indiquez ici le r&amp;#244;le de P_Statut&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Preparateurs_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Preparateurs_MessageOut"/>
    </operation>
    <operation name="Email_Palmares">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Email_Palmares (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Email_Palmares_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Email_Palmares_MessageOut"/>
    </operation>
    <operation name="Adresse_Client">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Adresse_Client (&amp;lt;P_IDClient&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDClient : &amp;lt;indiquez ici le r&amp;#244;le de P_IDClient&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Adresse_Client_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Adresse_Client_MessageOut"/>
    </operation>
    <operation name="Liste_Transfert_Ent">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Transfert_Ent (&amp;lt;P_IDEnt&amp;gt;, &amp;lt;P_LoginUser&amp;gt;, &amp;lt;P_Statut&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDEnt : &amp;lt;indiquez ici le r&amp;#244;le de P_IDBac&amp;gt;&lt;br /&gt;P_LoginUser : &amp;lt;indiquez ici le r&amp;#244;le de P_IDUser&amp;gt;&lt;br /&gt;P_Statut : &amp;lt;indiquez ici le r&amp;#244;le de P_Statut&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Transfert_Ent_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Transfert_Ent_MessageOut"/>
    </operation>
    <operation name="Liste_Lignes_Transfert">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Lignes_Transfert (&amp;lt;P_IDDoc&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDDoc : &amp;lt;indiquez ici le r&amp;#244;le de P_IDDoc&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Lignes_Transfert_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Lignes_Transfert_MessageOut"/>
    </operation>
    <operation name="Import_StatutDocSto">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Import_StatutDocSto (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_StatutDocSto_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_StatutDocSto_MessageOut"/>
    </operation>
    <operation name="Trace_GPS">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Trace_GPS (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Trace_GPS_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Trace_GPS_MessageOut"/>
    </operation>
    <operation name="BalanceAgee_UnClient">
      <documentation>R&amp;eacute;sum&amp;eacute; : Permet de retourne les infos d'encours d'un client &amp;gt; total de l'encours, encours sur le mois M, encours sur le mois M-1...&lt;br /&gt;On indique aussi pour chaque mois : si l'encours &amp;gt; 0 et que l'&amp;eacute;ch&amp;eacute;ance est d&amp;eacute;pass&amp;eacute;e alors BOOLEEN ALERTE= Vrai (Faux sinon)&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] BalanceAgee_UnClient (&amp;lt;P_CodeClient&amp;gt; est cha&amp;#238;ne)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_CodeClient (cha&amp;#238;ne ANSI) : &amp;lt;indiquez ici le r&amp;#244;le de P_Client&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_BalanceAgee_UnClient_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_BalanceAgee_UnClient_MessageOut"/>
    </operation>
    <operation name="Util_DateHeure_Serveur">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Util_DateHeure_Serveur ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Util_DateHeure_Serveur_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Util_DateHeure_Serveur_MessageOut"/>
    </operation>
    <operation name="CadencierPrdt_Client">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] CadencierPrdt_Client (&amp;lt;P_CodeClient&amp;gt; est cha&amp;#238;ne, &amp;lt;P_DebPeriode&amp;gt; est cha&amp;#238;ne, &amp;lt;P_FinPeriode&amp;gt; est cha&amp;#238;ne)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_CodeClient (cha&amp;#238;ne ANSI) :&amp;lt;indiquez ici le r&amp;#244;le de P_CodeClient&amp;gt;&lt;br /&gt;P_DebPeriode (cha&amp;#238;ne ANSI) :&amp;lt;indiquez ici le r&amp;#244;le de dP_DebPeriode&amp;gt;&lt;br /&gt;P_FinPeriode (cha&amp;#238;ne ANSI) :&amp;lt;indiquez ici le r&amp;#244;le de P_FinPeriode&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;dP_FinPeriode (date) :&amp;lt;indiquez ici le r&amp;#244;le de dP_FinPeriode&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_CadencierPrdt_Client_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_CadencierPrdt_Client_MessageOut"/>
    </operation>
    <operation name="ConnexionWeb">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] ConnexionWeb (&amp;lt;P_User&amp;gt;, &amp;lt;P_Pswd&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_User :&amp;lt;indiquez ici le r&amp;#244;le de P_User&amp;gt;&lt;br /&gt;P_Pswd :&amp;lt;indiquez ici le r&amp;#244;le de P_Pswd&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_ConnexionWeb_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_ConnexionWeb_MessageOut"/>
    </operation>
    <operation name="Liste_Transporteurs">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Transporteurs (&amp;lt;P_IDClient&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDClient :&amp;lt;indiquez ici le r&amp;#244;le de P_User&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_Pswd :&amp;lt;indiquez ici le r&amp;#244;le de P_Pswd&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Transporteurs_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Transporteurs_MessageOut"/>
    </operation>
    <operation name="Liste_Familles">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Familles (&amp;lt;P_LastSynchro&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Familles_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Familles_MessageOut"/>
    </operation>
    <operation name="Liste_ArtStockModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_ArtStockModif (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_IDRepresentant&amp;gt;, &amp;lt;P_Page&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro :&amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDRepresentant :&amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;P_Page :&amp;lt;indiquez ici le r&amp;#244;le de P_Page&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_ArtStockModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_ArtStockModif_MessageOut"/>
    </operation>
    <operation name="PrixArticle">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] PrixArticle (&amp;lt;P_IDArticle&amp;gt;, &amp;lt;P_IDPointDeVente&amp;gt;, &amp;lt;P_IDClient&amp;gt;, &amp;lt;P_CodeTarif&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDArticle :&amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDPointDeVente :&amp;lt;indiquez ici le r&amp;#244;le de P_IDPointDeVente&amp;gt;&lt;br /&gt;P_IDClient :&amp;lt;indiquez ici le r&amp;#244;le de P_CodeClient&amp;gt;&lt;br /&gt;P_CodeTarif : &amp;lt;indiquez ici le r&amp;#244;le de P_CodeTarif&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;P_Page : &amp;lt;indiquez ici le r&amp;#244;le de P_Page&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_PrixArticle_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_PrixArticle_MessageOut"/>
    </operation>
    <operation name="Modif_ConnexionWeb">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Modif_ConnexionWeb (&amp;lt;P_User&amp;gt;, &amp;lt;P_Pswd&amp;gt;, &amp;lt;P_NewPswd&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_User : &amp;lt;indiquez ici le r&amp;#244;le de P_User&amp;gt;&lt;br /&gt;P_Pswd : &amp;lt;indiquez ici le r&amp;#244;le de P_Pswd&amp;gt;&lt;br /&gt;P_NewPswd : &amp;lt;indiquez ici le r&amp;#244;le de P_NewPswd&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Modif_ConnexionWeb_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Modif_ConnexionWeb_MessageOut"/>
    </operation>
    <operation name="Liste_DocCom">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_DocCom (&amp;lt;P_TypeDoc&amp;gt;, &amp;lt;P_NumDoc&amp;gt;, &amp;lt;P_CodeClient&amp;gt;, &amp;lt;P_NbDocs&amp;gt;, &amp;lt;P_DateDeb&amp;gt;, &amp;lt;P_DateFin&amp;gt;, &amp;lt;P_NivDet&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_TypeDoc :&amp;lt;indiquez ici le r&amp;#244;le de P_TypeDoc&amp;gt;&lt;br /&gt;P_NumDoc :&amp;lt;indiquez ici le r&amp;#244;le de P_NumDoc&amp;gt;&lt;br /&gt;P_CodeClient :&amp;lt;indiquez ici le r&amp;#244;le de P_CodeClient&amp;gt;&lt;br /&gt;P_NbDocs :&amp;lt;indiquez ici le r&amp;#244;le de P_NbDocs&amp;gt;&lt;br /&gt;P_DateDeb :&amp;lt;indiquez ici le r&amp;#244;le de P_DateDeb&amp;gt;&lt;br /&gt;P_DateFin :&amp;lt;indiquez ici le r&amp;#244;le de P_DateFin&amp;gt;&lt;br /&gt;P_NivDet :&amp;lt;indiquez ici le r&amp;#244;le de P_NivDet&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_IDClient :&amp;lt;indiquez ici le r&amp;#244;le de P_DocCom&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_DocCom_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_DocCom_MessageOut"/>
    </operation>
    <operation name="Liste_PrixArticle">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_PrixArticle (&amp;lt;P_Mode&amp;gt;, &amp;lt;P_Client&amp;gt;, &amp;lt;P_CodeTarif&amp;gt;, &amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Mode :&amp;lt;indiquez ici le r&amp;#244;le de P_CodeClient&amp;gt;&lt;br /&gt;P_Client : &amp;lt;indiquez ici le r&amp;#244;le de P_Client&amp;gt;&lt;br /&gt;P_CodeTarif :&amp;lt;indiquez ici le r&amp;#244;le de P_CodeTarif&amp;gt;&lt;br /&gt;P_Data :&amp;lt;indiquez ici le r&amp;#244;le de P_IDArticle&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_IDPointDeVente : &amp;lt;indiquez ici le r&amp;#244;le de P_IDPointDeVente&amp;gt;&lt;br /&gt;P_IDClient : &amp;lt;indiquez ici le r&amp;#244;le de P_IDClient&amp;gt;&lt;br /&gt;P_CodeTarif : &amp;lt;indiquez ici le r&amp;#244;le de P_CodeTarif&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_PrixArticle_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_PrixArticle_MessageOut"/>
    </operation>
    <operation name="Liste_FamillesWEB">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_FamillesWEB (&amp;lt;P_LastSynchro&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_FamillesWEB_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_FamillesWEB_MessageOut"/>
    </operation>
    <operation name="Liste_NewDocWEB">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_NewDocWEB (&amp;lt;P_IDRepr&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDRepr : &amp;lt;indiquez ici le r&amp;#244;le de P_IDRepr&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_NewDocWEB_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_NewDocWEB_MessageOut"/>
    </operation>
    <operation name="Modif_DocWeb">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Modif_DocWeb (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Modif_DocWeb_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Modif_DocWeb_MessageOut"/>
    </operation>
    <operation name="Notifications_Nb">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Notifications_Nb (&amp;lt;P_IDRepr&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDRepr :&amp;lt;indiquez ici le r&amp;#244;le de P_IDRepr&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Notifications_Nb_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Notifications_Nb_MessageOut"/>
    </operation>
    <operation name="Notifications_Liste">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Notifications_Liste (&amp;lt;P_IDRepr&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDRepr :&amp;lt;indiquez ici le r&amp;#244;le de P_IDRepr&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Notifications_Liste_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Notifications_Liste_MessageOut"/>
    </operation>
    <operation name="Liste_Doccom_EasyTablet">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Doccom_EasyTablet (&amp;lt;P_TypeDoc&amp;gt;, &amp;lt;P_NumDoc&amp;gt;, &amp;lt;P_CodeClient&amp;gt;, &amp;lt;P_Date&amp;gt;, &amp;lt;P_IDRepr&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_TypeDoc :&amp;lt;indiquez ici le r&amp;#244;le de P_TypeDoc&amp;gt;&lt;br /&gt;P_NumDoc :&amp;lt;indiquez ici le r&amp;#244;le de P_NumDoc&amp;gt;&lt;br /&gt;P_CodeClient :&amp;lt;indiquez ici le r&amp;#244;le de P_CodeClient&amp;gt;&lt;br /&gt;P_Date :&amp;lt;indiquez ici le r&amp;#244;le de P_DateDeb&amp;gt;&lt;br /&gt;P_IDRepr :&amp;lt;indiquez ici le r&amp;#244;le de P_NivDet&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_NbDocs :&amp;lt;indiquez ici le r&amp;#244;le de P_NbDocs&amp;gt;&lt;br /&gt;P_DateFin :&amp;lt;indiquez ici le r&amp;#244;le de P_DateFin&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Doccom_EasyTablet_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Doccom_EasyTablet_MessageOut"/>
    </operation>
    <operation name="WebHook_Test">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;WebHook_Test (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_WebHook_Test_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_WebHook_Test_MessageOut"/>
    </operation>
    <operation name="Liste_Transporteurs_v2">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Transporteurs_v2 (&amp;lt;P_IDClient&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDClient :&amp;lt;indiquez ici le r&amp;#244;le de P_IDClient&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Transporteurs_v2_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Transporteurs_v2_MessageOut"/>
    </operation>
    <operation name="Liste_PrixCondition_Modif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_PrixCondition_Modif (&amp;lt;P_LastSynchro&amp;gt;, &amp;lt;P_IDTermMobil&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro :&amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;&lt;br /&gt;P_Page : &amp;lt;indiquez ici le r&amp;#244;le de P_Page&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_PrixCondition_Modif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_PrixCondition_Modif_MessageOut"/>
    </operation>
    <operation name="Connexion">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Connexion (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Connexion_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Connexion_MessageOut"/>
    </operation>
    <operation name="Infos_UnArticle">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Infos_UnArticle (&amp;lt;P_Identifiant&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Identifiant :&amp;lt;indiquez ici le r&amp;#244;le de P_IDArticle&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Infos_UnArticle_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Infos_UnArticle_MessageOut"/>
    </operation>
    <operation name="Import_CommentDocCom">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Import_CommentDocCom (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_CommentDocCom_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_CommentDocCom_MessageOut"/>
    </operation>
    <operation name="Comment_DocCom">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Comment_DocCom (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data :&amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;Type ind&amp;eacute;termin&amp;eacute; : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Comment_DocCom_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Comment_DocCom_MessageOut"/>
    </operation>
    <operation name="Liste_NewDocAUTO">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_NewDocAUTO (&amp;lt;P_IDRepr&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDRepr :&amp;lt;indiquez ici le r&amp;#244;le de P_IDRepr&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_NewDocAUTO_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_NewDocAUTO_MessageOut"/>
    </operation>
    <operation name="Modif_DocAuto">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Modif_DocAuto (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Modif_DocAuto_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Modif_DocAuto_MessageOut"/>
    </operation>
    <operation name="Init_Connexion_BackOffice">
      <input message="s0:WebServ_EasyTablet_Init_Connexion_BackOffice_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Init_Connexion_BackOffice_MessageOut"/>
    </operation>
    <operation name="Liste_Lignes_BonPrepa_SAGE">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Lignes_BonPrepa_SAGE (&amp;lt;P_IDDoc&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDDoc :&amp;lt;indiquez ici le r&amp;#244;le de P_IDDoc&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Lignes_BonPrepa_SAGE_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Lignes_BonPrepa_SAGE_MessageOut"/>
    </operation>
    <operation name="Cherche_Liste_Article">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Cherche_Liste_Article (&amp;lt;P_CritRech&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_CritRech : &amp;lt;indiquez ici le r&amp;#244;le de P_CritRech&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Cherche_Liste_Article_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Cherche_Liste_Article_MessageOut"/>
    </operation>
    <operation name="Liste_Lignes_Panier_Ruptures">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Lignes_Panier_Ruptures (&amp;lt;P_IDClient&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDClient : &amp;lt;indiquez ici le r&amp;#244;le de P_IDClient&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : &amp;lt;indiquez ici le r&amp;#244;le de la valeur de retour&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Lignes_Panier_Ruptures_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Lignes_Panier_Ruptures_MessageOut"/>
    </operation>
    <operation name="Import_Panier_Ligne">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Import_Panier_Ligne ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_Panier_Ligne_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_Panier_Ligne_MessageOut"/>
    </operation>
    <operation name="Retrait_Panier_Ligne">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Retrait_Panier_Ligne ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Retrait_Panier_Ligne_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Retrait_Panier_Ligne_MessageOut"/>
    </operation>
    <operation name="Liste_Paniers">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Paniers (&amp;lt;P_IDRepresentant&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDRepresentant : &amp;lt;indiquez ici le r&amp;#244;le de P_IDRepresentant&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : &amp;lt;indiquez ici le r&amp;#244;le de la valeur de retour&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Paniers_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Paniers_MessageOut"/>
    </operation>
    <operation name="Etat_Panier_Ruptures">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Etat_Panier_Ruptures (&amp;lt;P_IDRepresentant&amp;gt;, &amp;lt;P_IDClient&amp;gt;, &amp;lt;P_IDPtVente&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDRepresentant : &amp;lt;indiquez ici le r&amp;#244;le de P_IDRepresentant&amp;gt;&lt;br /&gt;P_IDClient : &amp;lt;indiquez ici le r&amp;#244;le de P_IDClient&amp;gt;&lt;br /&gt;P_IDPtVente : &amp;lt;indiquez ici le r&amp;#244;le de P_IDPtVente&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : &amp;lt;indiquez ici le r&amp;#244;le de la valeur de retour&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Etat_Panier_Ruptures_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Etat_Panier_Ruptures_MessageOut"/>
    </operation>
    <operation name="Modif_Panier_Ligne">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Modif_Panier_Ligne ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Modif_Panier_Ligne_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Modif_Panier_Ligne_MessageOut"/>
    </operation>
    <operation name="Liste_DocSto_EasyTablet">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Liste_DocSto_EasyTablet ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_DocSto_EasyTablet_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_DocSto_EasyTablet_MessageOut"/>
    </operation>
    <operation name="Liste_FichCliPARTModif">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_FichCliPARTModif (&amp;lt;P_LastSynchro&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_LastSynchro : &amp;lt;indiquez ici le r&amp;#244;le de P_LastSynchro&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : &amp;lt;indiquez ici le r&amp;#244;le de la valeur de retour&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;Indiquez ici un exemple d'utilisation.&lt;br /&gt;&lt;br /&gt;P_IDTermMobil : &amp;lt;indiquez ici le r&amp;#244;le de P_IDTermMobil&amp;gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_FichCliPARTModif_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_FichCliPARTModif_MessageOut"/>
    </operation>
    <operation name="Retrait_Panier">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Retrait_Panier ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Retrait_Panier_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Retrait_Panier_MessageOut"/>
    </operation>
    <operation name="Liste_LotsDLUO_ClientsArticle">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_LotsDLUO_ClientsArticle (&amp;lt;P_IDClient&amp;gt;, &amp;lt;p_CodeArticle_BO&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDClient : &amp;lt;indiquez ici le r&amp;#244;le de P_IDClient&amp;gt;&lt;br /&gt;p_CodeArticle_BO : &amp;lt;indiquez ici le r&amp;#244;le de p_CodeArticle_BO&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : &amp;lt;indiquez ici le r&amp;#244;le de la valeur de retour&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_LotsDLUO_ClientsArticle_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_LotsDLUO_ClientsArticle_MessageOut"/>
    </operation>
    <operation name="Import_FAV_Clients">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Import_FAV_Clients (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : &amp;lt;indiquez ici le r&amp;#244;le de la valeur de retour&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_FAV_Clients_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_FAV_Clients_MessageOut"/>
    </operation>
    <operation name="Liste_ParamWebService">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Liste_ParamWebService ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_ParamWebService_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_ParamWebService_MessageOut"/>
    </operation>
    <operation name="Liste_Transporteurs_MVWeb">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Liste_Transporteurs_MVWeb ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Transporteurs_MVWeb_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Transporteurs_MVWeb_MessageOut"/>
    </operation>
    <operation name="Liste_Lignes_CmdeAchat_IDS">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_Lignes_CmdeAchat_IDS (&amp;lt;P_IDDoc&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDDoc : &amp;lt;indiquez ici le r&amp;#244;le de P_IDDoc&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;Type ind&amp;eacute;termin&amp;eacute; : &amp;lt;indiquez ici le r&amp;#244;le de la valeur de retour&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Lignes_CmdeAchat_IDS_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Lignes_CmdeAchat_IDS_MessageOut"/>
    </operation>
    <operation name="Util_VersionAppli">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Util_VersionAppli (&amp;lt;P_CodeAppli&amp;gt;, &amp;lt;P_VersionInst&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_CodeAppli : &amp;lt;indiquez ici le r&amp;#244;le de P_CodeAppli&amp;gt;&lt;br /&gt;P_VersionInst : &amp;lt;indiquez ici le r&amp;#244;le de P_VersionInst&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : &amp;lt;indiquez ici le r&amp;#244;le de la valeur de retour&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Util_VersionAppli_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Util_VersionAppli_MessageOut"/>
    </operation>
    <operation name="Util_Infos_Serveur">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Util_Infos_Serveur ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Util_Infos_Serveur_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Util_Infos_Serveur_MessageOut"/>
    </operation>
    <operation name="Import_ContactClient">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Import_ContactClient (&amp;lt;P_Data&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_Data : &amp;lt;indiquez ici le r&amp;#244;le de P_Data&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;Type ind&amp;eacute;termin&amp;eacute; : // 	Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_ContactClient_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_ContactClient_MessageOut"/>
    </operation>
    <operation name="Liste_Lignes_BOFacture">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Liste_Lignes_BOFacture ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_Lignes_BOFacture_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_Lignes_BOFacture_MessageOut"/>
    </operation>
    <operation name="Init_Connexion_BackOffice_IDS">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Init_Connexion_BackOffice_IDS ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Init_Connexion_BackOffice_IDS_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Init_Connexion_BackOffice_IDS_MessageOut"/>
    </operation>
    <operation name="Liste_CmdesAchat_PROGINOV">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_CmdesAchat_PROGINOV (&amp;lt;P_IDDossier&amp;gt;, &amp;lt;P_DateRef&amp;gt;, &amp;lt;P_Statut&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_IDDossier : &amp;lt;indiquez ici le r&amp;#244;le de P_IDDossier&amp;gt;&lt;br /&gt;P_DateRef : &amp;lt;indiquez ici le r&amp;#244;le de P_DateRef&amp;gt;&lt;br /&gt;P_Statut : &amp;lt;indiquez ici le r&amp;#244;le de P_Statut&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : &amp;lt;indiquez ici le r&amp;#244;le de la valeur de retour&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_CmdesAchat_PROGINOV_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_CmdesAchat_PROGINOV_MessageOut"/>
    </operation>
    <operation name="Liste_CmdesAchatLignes_PROGINOV">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Liste_CmdesAchatLignes_PROGINOV ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_CmdesAchatLignes_PROGINOV_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_CmdesAchatLignes_PROGINOV_MessageOut"/>
    </operation>
    <operation name="Palettes_DocCom">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Palettes_DocCom ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Palettes_DocCom_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Palettes_DocCom_MessageOut"/>
    </operation>
    <operation name="Import_Palettes_DocCom">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Import_Palettes_DocCom ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Import_Palettes_DocCom_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Import_Palettes_DocCom_MessageOut"/>
    </operation>
    <operation name="Liste_BonLiv_SAGE">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_BonLiv_SAGE (&amp;lt;P_DateRef&amp;gt;, &amp;lt;P_Statut&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_DateRef : &amp;lt;indiquez ici le r&amp;#244;le de P_DateRef&amp;gt;&lt;br /&gt;P_Statut : &amp;lt;indiquez ici le r&amp;#244;le de P_Statut&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : &amp;lt;indiquez ici le r&amp;#244;le de la valeur de retour&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_BonLiv_SAGE_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_BonLiv_SAGE_MessageOut"/>
    </operation>
    <operation name="Liste_BonLivLignes_SAGE">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;[ &amp;lt;R&amp;eacute;sultat&amp;gt; = ] Liste_BonLivLignes_SAGE (&amp;lt;P_NumBonLiv&amp;gt;)&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;P_NumBonLiv : &amp;lt;indiquez ici le r&amp;#244;le de P_NumBonLiv&amp;gt;&lt;br /&gt;Valeur de retour :&lt;br /&gt;cha&amp;#238;ne ANSI : &amp;lt;indiquez ici le r&amp;#244;le de la valeur de retour&amp;gt;&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_BonLivLignes_SAGE_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_BonLivLignes_SAGE_MessageOut"/>
    </operation>
    <operation name="Liste_DocVente_SAGE">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Liste_DocVente_SAGE ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_DocVente_SAGE_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_DocVente_SAGE_MessageOut"/>
    </operation>
    <operation name="Liste_DocVenteLignes_SAGE">
      <documentation>R&amp;eacute;sum&amp;eacute; : &amp;lt;indiquez ici ce que fait la proc&amp;eacute;dure&amp;gt;&lt;br /&gt;Syntaxe :&lt;br /&gt;Liste_DocVenteLignes_SAGE ()&lt;br /&gt;&lt;br /&gt;Param&amp;egrave;tres :&lt;br /&gt;Aucun&lt;br /&gt;Valeur de retour :&lt;br /&gt;Aucune&lt;br /&gt;&lt;br /&gt;Exemple :&lt;br /&gt;&amp;lt;Indiquez ici un exemple d'utilisation&amp;gt;&lt;br /&gt;</documentation>
      <input message="s0:WebServ_EasyTablet_Liste_DocVenteLignes_SAGE_MessageIn"/>
      <output message="s0:WebServ_EasyTablet_Liste_DocVenteLignes_SAGE_MessageOut"/>
    </operation>
  </portType>
  <binding name="WebServ_EasyTabletSOAPBinding" type="s0:WebServ_EasyTabletSOAPPortType">
    <soap:binding transport="http://schemas.xmlsoap.org/soap/http" style="document"/>
    <operation name="Liste_Articles">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Articles" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="StockDispo_Articles">
      <soap:operation soapAction="urn:WebServ_EasyTablet/StockDispo_Articles" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="StockDispo_UnArticle">
      <soap:operation soapAction="urn:WebServ_EasyTablet/StockDispo_UnArticle" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_RDVHebdo">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_RDVHebdo" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_LotsStock_Articles">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_LotsStock_Articles" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_DocCom">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_DocCom" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Etat_DocCom">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Etat_DocCom" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_ParamGeneModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_ParamGeneModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_ParamArtModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_ParamArtModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_LiensArtModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_LiensArtModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_ParamCliModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_ParamCliModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_FichCliModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_FichCliModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_LiensCliModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_LiensCliModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_ReprModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_ReprModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_TarifsModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_TarifsModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_DataGPS">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_DataGPS" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_LotsModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_LotsModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_TarifsModif_bis">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_TarifsModif_bis" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_TarifsModif_ter">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_TarifsModif_ter" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_FichArtModif_v2">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_FichArtModif_v2" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_DocSto">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_DocSto" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Etat_DocSto">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Etat_DocSto" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Encours_Clients">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Encours_Clients" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_DocStoModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_DocStoModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Export_DocSto">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Export_DocSto" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_UtilModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_UtilModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_DocSto_Modif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_DocSto_Modif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_UtilStock">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_UtilStock" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_LotsStock_Articles_All">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_LotsStock_Articles_All" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_LiensArtModif_All">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_LiensArtModif_All" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_FichCliModif_All">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_FichCliModif_All" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_FichArtModif_All">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_FichArtModif_All" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Email_DocCom">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Email_DocCom" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_LotsModif_All">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_LotsModif_All" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_DetLotArtModif_All">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_DetLotArtModif_All" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="OuvreFichierLOG">
      <soap:operation soapAction="urn:WebServ_EasyTablet/OuvreFichierLOG" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Ecrit_LOG">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Ecrit_LOG" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_LotsStock_Articles_v2">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_LotsStock_Articles_v2" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_TarifsModif_optim">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_TarifsModif_optim" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="StockDispo_ListeArticles">
      <soap:operation soapAction="urn:WebServ_EasyTablet/StockDispo_ListeArticles" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_CDB">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_CDB" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_DLUO">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_DLUO" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Modif_DocSto">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Modif_DocSto" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_BacsPrepa">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_BacsPrepa" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_BonPrepa_Bac">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_BonPrepa_Bac" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Lignes_BonPrepa">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Lignes_BonPrepa" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_QuiPrepa">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_QuiPrepa" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_StatutDocCom">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_StatutDocCom" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Preparateurs">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Preparateurs" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Email_Palmares">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Email_Palmares" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Adresse_Client">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Adresse_Client" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Transfert_Ent">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Transfert_Ent" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Lignes_Transfert">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Lignes_Transfert" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_StatutDocSto">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_StatutDocSto" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Trace_GPS">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Trace_GPS" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="BalanceAgee_UnClient">
      <soap:operation soapAction="urn:WebServ_EasyTablet/BalanceAgee_UnClient" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Util_DateHeure_Serveur">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Util_DateHeure_Serveur" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="CadencierPrdt_Client">
      <soap:operation soapAction="urn:WebServ_EasyTablet/CadencierPrdt_Client" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="ConnexionWeb">
      <soap:operation soapAction="urn:WebServ_EasyTablet/ConnexionWeb" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Transporteurs">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Transporteurs" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Familles">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Familles" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_ArtStockModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_ArtStockModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="PrixArticle">
      <soap:operation soapAction="urn:WebServ_EasyTablet/PrixArticle" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Modif_ConnexionWeb">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Modif_ConnexionWeb" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_DocCom">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_DocCom" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_PrixArticle">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_PrixArticle" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_FamillesWEB">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_FamillesWEB" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_NewDocWEB">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_NewDocWEB" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Modif_DocWeb">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Modif_DocWeb" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Notifications_Nb">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Notifications_Nb" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Notifications_Liste">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Notifications_Liste" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Doccom_EasyTablet">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Doccom_EasyTablet" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="WebHook_Test">
      <soap:operation soapAction="urn:WebServ_EasyTablet/WebHook_Test" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Transporteurs_v2">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Transporteurs_v2" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_PrixCondition_Modif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_PrixCondition_Modif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Connexion">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Connexion" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Infos_UnArticle">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Infos_UnArticle" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_CommentDocCom">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_CommentDocCom" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Comment_DocCom">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Comment_DocCom" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_NewDocAUTO">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_NewDocAUTO" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Modif_DocAuto">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Modif_DocAuto" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Init_Connexion_BackOffice">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Init_Connexion_BackOffice" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Lignes_BonPrepa_SAGE">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Lignes_BonPrepa_SAGE" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Cherche_Liste_Article">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Cherche_Liste_Article" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Lignes_Panier_Ruptures">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Lignes_Panier_Ruptures" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_Panier_Ligne">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_Panier_Ligne" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Retrait_Panier_Ligne">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Retrait_Panier_Ligne" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Paniers">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Paniers" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Etat_Panier_Ruptures">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Etat_Panier_Ruptures" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Modif_Panier_Ligne">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Modif_Panier_Ligne" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_DocSto_EasyTablet">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_DocSto_EasyTablet" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_FichCliPARTModif">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_FichCliPARTModif" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Retrait_Panier">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Retrait_Panier" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_LotsDLUO_ClientsArticle">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_LotsDLUO_ClientsArticle" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_FAV_Clients">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_FAV_Clients" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_ParamWebService">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_ParamWebService" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Transporteurs_MVWeb">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Transporteurs_MVWeb" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Lignes_CmdeAchat_IDS">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Lignes_CmdeAchat_IDS" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Util_VersionAppli">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Util_VersionAppli" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Util_Infos_Serveur">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Util_Infos_Serveur" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_ContactClient">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_ContactClient" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_Lignes_BOFacture">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_Lignes_BOFacture" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Init_Connexion_BackOffice_IDS">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Init_Connexion_BackOffice_IDS" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_CmdesAchat_PROGINOV">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_CmdesAchat_PROGINOV" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_CmdesAchatLignes_PROGINOV">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_CmdesAchatLignes_PROGINOV" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Palettes_DocCom">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Palettes_DocCom" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Import_Palettes_DocCom">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Import_Palettes_DocCom" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_BonLiv_SAGE">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_BonLiv_SAGE" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_BonLivLignes_SAGE">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_BonLivLignes_SAGE" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_DocVente_SAGE">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_DocVente_SAGE" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="Liste_DocVenteLignes_SAGE">
      <soap:operation soapAction="urn:WebServ_EasyTablet/Liste_DocVenteLignes_SAGE" style="document"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>
  <service name="WebServ_EasyTablet">
    <port name="WebServ_EasyTabletSOAPPort" binding="s0:WebServ_EasyTabletSOAPBinding">
      <soap:address location="%ADRESSE%"/>
    </port>
  </service>
</definitions>
`;
