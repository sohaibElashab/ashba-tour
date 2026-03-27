import { useLocale, Language } from "@/contexts/locale-context";
import type { Tour } from "@/lib/data";

/**
 * Maps a base field name to its localized variant for a given language.
 * Falls back to the default (English) field if the localized field is empty or missing.
 */
const localizedFieldMap: Record<string, Partial<Record<Language, string>>> = {
  title: { fr: "titleFr" },
  description: { fr: "descriptionFr" },
  features: { fr: "featuresFr" },
};

/**
 * Returns the localized value of a field from a data record.
 * Falls back to the default field value if no translation exists.
 */
export function getLocalizedField<T extends Record<string, any>>(
  item: T,
  field: string,
  language: Language,
): string {
  if (language !== "en") {
    const localizedKey = localizedFieldMap[field]?.[language];
    if (localizedKey && item[localizedKey]) {
      return item[localizedKey];
    }
  }
  return item[field] ?? "";
}

/**
 * Hook that returns a helper function bound to the current language.
 * Usage: const { localizedField } = useLocalizedData();
 *        localizedField(tour, 'title')
 */
export function useLocalizedData() {
  const { language } = useLocale();

  const localizedField = <T extends Record<string, any>>(
    item: T,
    field: string,
  ): string => {
    return getLocalizedField(item, field, language);
  };

  return { localizedField, language };
}
