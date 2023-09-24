package com.lingohub.restfull.factory;

import com.lingohub.restfull.models.LanguageCode;
import com.lingohub.restfull.service.LanguageCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LanguageCodeFactory {
    private final LanguageCodeService languageCodeService;

    @Autowired
    public LanguageCodeFactory(LanguageCodeService languageCodeService) {
        this.languageCodeService = languageCodeService;
    }

    public void run() {
        languageCodeService.create(new LanguageCode("Ukrainian", "uk"));
        languageCodeService.create(new LanguageCode("English", "en"));
        languageCodeService.create(new LanguageCode("Russian", "ru"));
        languageCodeService.create(new LanguageCode("Afrikaans", "af"));
        languageCodeService.create(new LanguageCode("Albanian", "sq"));
        languageCodeService.create(new LanguageCode("Amharic", "am"));
        languageCodeService.create(new LanguageCode("Arabic", "ar"));
        languageCodeService.create(new LanguageCode("Armenian", "hy"));
        languageCodeService.create(new LanguageCode("Assamese", "as"));
        languageCodeService.create(new LanguageCode("Aymara", "ay"));
        languageCodeService.create(new LanguageCode("Azerbaijani", "az"));
        languageCodeService.create(new LanguageCode("Bambara", "bm"));
        languageCodeService.create(new LanguageCode("Basque", "eu"));
        languageCodeService.create(new LanguageCode("Belarusian", "be"));
        languageCodeService.create(new LanguageCode("Bengali", "bn"));
        languageCodeService.create(new LanguageCode("Bhojpuri", "bho"));
        languageCodeService.create(new LanguageCode("Bosnian", "bs"));
        languageCodeService.create(new LanguageCode("Bulgarian", "bg"));
        languageCodeService.create(new LanguageCode("Catalan", "ca"));
        languageCodeService.create(new LanguageCode("Cebuano", "ceb"));
        languageCodeService.create(new LanguageCode("Chinese (Simplified)", "zh-CN"));
        languageCodeService.create(new LanguageCode("Chinese (Traditional)", "zh-TW"));
        languageCodeService.create(new LanguageCode("Corsican", "co"));
        languageCodeService.create(new LanguageCode("Croatian", "hr"));
        languageCodeService.create(new LanguageCode("Czech", "cs"));
        languageCodeService.create(new LanguageCode("Danish", "da"));
        languageCodeService.create(new LanguageCode("Dhivehi", "dv"));
        languageCodeService.create(new LanguageCode("Dogri", "doi"));
        languageCodeService.create(new LanguageCode("Dutch", "nl"));
        languageCodeService.create(new LanguageCode("Esperanto", "eo"));
        languageCodeService.create(new LanguageCode("Estonian", "et"));
        languageCodeService.create(new LanguageCode("Ewe", "ee"));
        languageCodeService.create(new LanguageCode("Filipino (Tagalog)", "fil"));
        languageCodeService.create(new LanguageCode("Finnish", "fi"));
        languageCodeService.create(new LanguageCode("French", "fr"));
        languageCodeService.create(new LanguageCode("Frisian", "fy"));
        languageCodeService.create(new LanguageCode("Galician", "gl"));
        languageCodeService.create(new LanguageCode("Georgian", "ka"));
        languageCodeService.create(new LanguageCode("German", "de"));
        languageCodeService.create(new LanguageCode("Greek", "el"));
        languageCodeService.create(new LanguageCode("Guarani", "gn"));
        languageCodeService.create(new LanguageCode("Gujarati", "gu"));
        languageCodeService.create(new LanguageCode("Haitian Creole", "ht"));
        languageCodeService.create(new LanguageCode("Hausa", "ha"));
        languageCodeService.create(new LanguageCode("Hawaiian", "haw"));
        languageCodeService.create(new LanguageCode("Hebrew", "he"));//or iw
        languageCodeService.create(new LanguageCode("Hindi", "hi"));
        languageCodeService.create(new LanguageCode("Hmong", "hmn"));
        languageCodeService.create(new LanguageCode("Hungarian", "hu"));
        languageCodeService.create(new LanguageCode("Icelandic", "is"));
        languageCodeService.create(new LanguageCode("Igbo", "ig"));
        languageCodeService.create(new LanguageCode("Ilocano", "ilo"));
        languageCodeService.create(new LanguageCode("Indonesian", "id"));
        languageCodeService.create(new LanguageCode("Irish", "ga"));
        languageCodeService.create(new LanguageCode("Italian", "it"));
        languageCodeService.create(new LanguageCode("Japanese", "ja"));
        languageCodeService.create(new LanguageCode("Javanese", "jv"));//or jw
        languageCodeService.create(new LanguageCode("Kannada", "kn"));
        languageCodeService.create(new LanguageCode("Kazakh", "kk"));
        languageCodeService.create(new LanguageCode("Khmer", "km"));
        languageCodeService.create(new LanguageCode("Kinyarwanda", "rw"));
        languageCodeService.create(new LanguageCode("Konkani", "gom"));
        languageCodeService.create(new LanguageCode("Korean", "ko"));
        languageCodeService.create(new LanguageCode("Krio", "kri"));
        languageCodeService.create(new LanguageCode("Kurdish", "ku"));
        languageCodeService.create(new LanguageCode("Kurdish (Sorani)", "ckb"));
        languageCodeService.create(new LanguageCode("Kyrgyz", "ky"));
        languageCodeService.create(new LanguageCode("Lao", "lo"));
        languageCodeService.create(new LanguageCode("Latin", "la"));
        languageCodeService.create(new LanguageCode("Latvian", "lv"));
        languageCodeService.create(new LanguageCode("Lingala", "ln"));
        languageCodeService.create(new LanguageCode("Lithuanian", "lt"));
        languageCodeService.create(new LanguageCode("Luganda", "lg"));
        languageCodeService.create(new LanguageCode("Luxembourgish", "lb"));
        languageCodeService.create(new LanguageCode("Macedonian", "mk"));
        languageCodeService.create(new LanguageCode("Maithili", "mai"));
        languageCodeService.create(new LanguageCode("Malagasy", "mg"));
        languageCodeService.create(new LanguageCode("Malay", "ms"));
        languageCodeService.create(new LanguageCode("Malayalam", "ml"));
        languageCodeService.create(new LanguageCode("Maltese", "mt"));
        languageCodeService.create(new LanguageCode("Maori", "mi"));
        languageCodeService.create(new LanguageCode("Marathi", "mr"));
        languageCodeService.create(new LanguageCode("Meiteilon (Manipuri)", "mni-Mtei"));
        languageCodeService.create(new LanguageCode("Mizo", "lus"));
        languageCodeService.create(new LanguageCode("Mongolian", "mn"));
        languageCodeService.create(new LanguageCode("Myanmar (Burmese)", "my"));
        languageCodeService.create(new LanguageCode("Nepali", "ne"));
        languageCodeService.create(new LanguageCode("Norwegian", "no"));
        languageCodeService.create(new LanguageCode("Nyanja (Chichewa)", "ny"));
        languageCodeService.create(new LanguageCode("Odia (Oriya)", "or"));
        languageCodeService.create(new LanguageCode("Oromo", "om"));
        languageCodeService.create(new LanguageCode("Pashto", "ps"));
        languageCodeService.create(new LanguageCode("Persian", "fa"));
        languageCodeService.create(new LanguageCode("Polish", "pl"));
        languageCodeService.create(new LanguageCode("Portuguese (Portugal, Brazil)", "pt"));
        languageCodeService.create(new LanguageCode("Punjabi", "pa"));
        languageCodeService.create(new LanguageCode("Quechua", "qu"));
        languageCodeService.create(new LanguageCode("Romanian", "ro"));
        languageCodeService.create(new LanguageCode("Samoan", "sm"));
        languageCodeService.create(new LanguageCode("Sanskrit", "sa"));
        languageCodeService.create(new LanguageCode("Scots Gaelic", "gd"));
        languageCodeService.create(new LanguageCode("Sepedi", "nso"));
        languageCodeService.create(new LanguageCode("Serbian", "sr"));
        languageCodeService.create(new LanguageCode("Sesotho", "st"));
        languageCodeService.create(new LanguageCode("Shona", "sn"));
        languageCodeService.create(new LanguageCode("Sindhi", "sd"));
        languageCodeService.create(new LanguageCode("Sinhala (Sinhalese)", "si"));
        languageCodeService.create(new LanguageCode("Slovak", "sk"));
        languageCodeService.create(new LanguageCode("Slovenian", "sl"));
        languageCodeService.create(new LanguageCode("Somali", "so"));
        languageCodeService.create(new LanguageCode("Spanish", "es"));
        languageCodeService.create(new LanguageCode("Sundanese", "su"));
        languageCodeService.create(new LanguageCode("Swahili", "sw"));
        languageCodeService.create(new LanguageCode("Swedish", "sv"));
        languageCodeService.create(new LanguageCode("Tagalog (Filipino)", "tl"));
        languageCodeService.create(new LanguageCode("Tajik", "tg"));
        languageCodeService.create(new LanguageCode("Tamil", "ta"));
        languageCodeService.create(new LanguageCode("Tatar", "tt"));
        languageCodeService.create(new LanguageCode("Telugu", "te"));
        languageCodeService.create(new LanguageCode("Thai", "th"));
        languageCodeService.create(new LanguageCode("Tigrinya", "ti"));
        languageCodeService.create(new LanguageCode("Tsonga", "ts"));
        languageCodeService.create(new LanguageCode("Turkish", "tr"));
        languageCodeService.create(new LanguageCode("Turkmen", "tk"));
        languageCodeService.create(new LanguageCode("Twi (Akan)", "ak"));
        languageCodeService.create(new LanguageCode("Urdu", "ur"));
        languageCodeService.create(new LanguageCode("Uyghur", "ug"));
        languageCodeService.create(new LanguageCode("Uzbek", "uz"));
        languageCodeService.create(new LanguageCode("Vietnamese", "vi"));
        languageCodeService.create(new LanguageCode("Welsh", "cy"));
        languageCodeService.create(new LanguageCode("Xhosa", "xh"));
        languageCodeService.create(new LanguageCode("Yiddish", "yi"));
        languageCodeService.create(new LanguageCode("Yoruba", "yo"));
        languageCodeService.create(new LanguageCode("Zulu", "zu"));
    }
}
