package main.java.com.pigishentertainment.dndassistant;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DBManager {

  private static Connection connection = null;
  
  public DBManager() throws SQLException, ClassNotFoundException {
    // TODO: Remove hardcoding
    // ? This is currently defined within this projects docker-compose.yml
    String url = "jdbc:postgresql://localhost:8080/dnd_assistant";
    String username = "postgres";
    String password = "pass";

    Class.forName("org.postgresql.Driver");
    connection = DriverManager.getConnection(url, username, password);
    instantiateTable();
  }

  /**
   * Instantiates all tables within the database including:
   *  - Monsters
   *  - Components
   *  - Spells
   *  - Armours
   *  - Weapons
   *  - Gears
   */
  private void instantiateTable() {
    try {
      try (Statement monsterStatement = connection.createStatement()) {
        monsterStatement.executeQuery(CREATE_MONSTER_TABLE_QUERY);
      }
    } catch (SQLException e) {
      System.out.println("Monsters table already exists");
    }
    
    try {
      try (Statement componentStatement = connection.createStatement()) {
        componentStatement.executeQuery(CREATE_COMPONENT_TABLE_QUERY);
      }
    } catch (SQLException e) {
      System.out.println("Components table already exists");
    }
    
    try {
      try (Statement spellStatement = connection.createStatement()) {
        spellStatement.executeQuery(CREATE_SPELL_TABLE_QUERY);
      }
    } catch (SQLException e) {
      System.out.println("Spells table already exists");
    }
    
    try {
      try (Statement armourStatement = connection.createStatement()) {
        armourStatement.executeQuery(CREATE_ARMOUR_TABLE_QUERY);
      }
    } catch (SQLException e) {
      System.out.println("Armours table already exists");
    }
    
    try {
      try (Statement weaponStatement = connection.createStatement()) {
        weaponStatement.executeQuery(CREATE_WEAPON_TABLE_QUERY);
      }
    } catch (SQLException e) {
      System.out.println("Weapons table already exists");
    }
    
    try {
      try (Statement gearStatement = connection.createStatement()) {
        gearStatement.executeQuery(CREATE_GEAR_TABLE_QUERY);
      }
    } catch (SQLException e) {
      System.out.println("Gears table already exists");
    }
  }

  /**
   * Prints the names of all monsters within the table
   * 
   * @throws SQLException
   *          Throws SQL Exception if the query fails to execute 
   */
  public void printAllMonsterNames() throws SQLException {
    try (Statement statement = connection.createStatement()) {
      statement.setFetchSize(0);
      try (ResultSet results = statement.executeQuery("SELECT monsterID, name FROM Monsters")) {
        while (results.next()) {
          System.out.println(results.getString(1) + " " + results.getString(2));
        }
      }
    }
  }

  /**
   * Closes the jdbc connection to the database
   */
  public void shutdown() {
    try {
      connection.close();
    } catch (SQLException e) {
      System.out.println("Failed to shutdown database connection: " + e.toString());
    }
  }

  /**
   * Table creation queries
   */
  private final String CREATE_MONSTER_TABLE_QUERY = "CREATE TABLE Monsters (" +
        "monsterID int, " +
        "name varchar(255), " +
        "meta varchar(255), " +
        "ac varchar(255), " +
        "hp varchar(255), " +
        "speed varchar(255), " +
        "str float, " +
        "dex float, " +
        "con float, " +
        "int float, " +
        "wis float, " +
        "cha float, " +
        "savingThrows varchar(255), " +
        "skills varchar(255), " +
        "damageImmunities varchar(255), " +
        "senses varchar(255), " +
        "languages varchar(255), " +
        "challenge varchar(255), " +
        "traits nvarchar, " +
        "actions nvarchar, " +
        "legendaryActions nvarchar, " +
        "image varchar(255), " +
      ");";

  private final String CREATE_COMPONENT_TABLE_QUERY = "CREATE TABLE Components (" +
        "componentID int, " +
        "material bool, " +
        "materialsNeeded nvarchar, " +
        "raw varchar(255), " +
        "somatic bool, " +
        "verbal bool, " +
      ");";

  private final String CREATE_SPELL_TABLE_QUERY = "CREATE TABLE Spells (" +
        "spellID int, " +
        "name varchar(255), " +
        "description nvarchar, " +
        "level varchar(255), " +
        "duration varchar(255), " +
        "range varchar(255), " +
        "castingTime varchar(255), " +
        "type varchar(255), " +
        "school varchar(255), " +
        "castingTime varchar(255), " +
        "ritual bool, " +
        "classes varchar(255), " +
        "tags varchar(255), " +
        "components Components, " +
      ");";

  private final String CREATE_ARMOUR_TABLE_QUERY = "CREATE TABLE Armour (" +
        "armourID int, " +
        "name varchar(255), " +
        "cost varchar(255), " +
        "ac varchar(255), " +
        "strength varchar(255), " +
        "weight varchar(255) , " +
        "stealth varchar(255) , " +
      ");";

  private final String CREATE_WEAPON_TABLE_QUERY = "CREATE TABLE Weapon (" +
        "weaponsID int, " +
        "name varchar(255), " +
        "cost varchar(255), " +
        "damage varchar(255), " +
        "weight varchar(255) , " +
        "properties varchar(255), " +
        "type varchar(255) , " +
      ");";

  private final String CREATE_GEAR_TABLE_QUERY = "CREATE TABLE Gear (" +
        "componentID int, " +
        "name varchar(255), " +
        "cost varchar(255), " +
        "weight varchar(255) , " +
        "type varchar(255) , " +
      ");";
}
