package com.lingohub.restfull.helpers;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.lingohub.restfull.models.Word;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class TranslateHelper {
    public static String translate(Word word) {
        try {
            String encodedWord = URLEncoder.encode(word.getOrigin(), StandardCharsets.UTF_8);
            String apiUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + word.getOriginCode() +
                    "&tl=" + word.getTranslateCode() + "&dt=t&q=" + encodedWord;

            URL url = new URL(apiUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = reader.readLine()) != null) {
                    response.append(inputLine);
                }
                reader.close();

                // Обработка JSON-ответа и извлечение переведенного текста
                String jsonResponse = response.toString();

                return parseTranslationFromJSON(jsonResponse);
            } else {
                return "Error - HTTP Response Code: " + responseCode;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Error - IOException: " + e.getMessage();
        }
    }

    private static String parseTranslationFromJSON(String jsonResponse) {
        try {
            JsonArray jsonArray = JsonParser.parseString(jsonResponse).getAsJsonArray();
            if (jsonArray.size() > 0) {
                JsonArray sentenceArray = jsonArray.get(0).getAsJsonArray();
                if (sentenceArray.size() > 0) {
                    JsonElement translationElement = sentenceArray.get(0).getAsJsonArray().get(0);
                    if (translationElement != null) {
                        return translationElement.getAsString();
                    }
                }
            }
            return "Translation not found in JSON response";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error parsing JSON response: " + e.getMessage();
        }
    }
}
