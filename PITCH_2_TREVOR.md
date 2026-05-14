# Pitch: Personalized Bookmarks

## Task
Add functionality to the existing application to allow for customizable bookmarks.

## Product Question Responses
- **When should someone name a bookmark: while saving it, after saving it, or both?**
    - We give the user the option to name before saving, and have the field be editable so a user can change it at a later time
- **Should the act of bookmarking flow directly into naming, or should naming stay lightweight until later?**
    - The option to name immediately should be available, without forcing the interruption on the user.
- **Is the custom name optional, and if so what is the fallback?**
    - The custom name should be optional, as a user may not always need a title to be able to remember their reasoning for bookmarking
-  **Where should the bookmarks list live on the homepage so it feels useful but not distracting?**
    - I would have a dropdown be available in the navbar that would allow the user to quickly access their bookmarks without them taking up real estate on the home page.
- **How should reordering work: drag and drop, move controls, or something else?**
    - Drag and drop is the most user friendly option, but can get a bit messy when using larger lists.
- **What should happen when someone unbookmarks an item from the middle of the list?**
    - Bookmarks below push up
- **What should happen if a bookmark is added again after being removed?**
    - Should be considered a new bookmark and follow the default patter for new bookmarks
- **How should the UI behave when there are no bookmarks, only one bookmark, or many bookmarks?**
    - We can show either a filled or unfilled bookmark icon for if the bookmarks exist or not. The number of bookmarks would not be an immediately important piece of information. Can be provided once we open the bookmarks.
- **What edge cases matter for empty names, duplicate names, and very long names?**
    - Bookmarks would be saved using a unique PK, so empty names and duplicate names will have no impact (UI considerations here), very long names will need to be truncated

## AI Prompts 
I chose to add this section to showcase a bit of how I used AI in helping with this project. I used claude(Sonnnet 4.6) but left it completely disconnected from the codebase, so it was purely acting in a chat environment. No code changes directly from Claude Code.
- Prompt: 
>I'm trying to work on a UX problem. We want the ability to bookmark a given post. When we bookmark it we also would like the option to give that bookmark a title, but we don't necessarily want to force that on the user. So the user needs to know it is an option without interrupting their flow. Give me recommendations on this. Consider possible real world examples
- Response: 
    - Claude gave a few possible scenarios, but the one that stuck out to me was " Inline expand (tap to reveal)". The idea that after the user has pressed the bookmark, it has already been saved, from there a toast appears to give the user the opportunity to add a title to the bookmark.

- Prompt: 
> when having a list where the order can be manipulated, and that order is stored in a DB, what is the standard way to adjust the indexes when an item is deleted from the middle of the list?
- Response: 
    - Claude gave two potential options here. 
        1. Don't reindex at all (most common)
Store a position integer on each row, but treat it as an arbitrary sort order rather than a gapless sequence. When you delete item at position 3 from [1, 2, 3, 4, 5], you just delete it and query with ORDER BY position. The gap doesn't matter — you end up with [1, 2, 4, 5] and nothing breaks.
        2. Fractional/lexicographic positioning - Instead of integers, use a float or a string column. To insert or reorder between two items, you pick a value between their two positions — no other rows need updating ever. Deletion is just a delete, no reindexing needed at all.
    - With option 2 claude also introduced the gem `acts_as_list`
- Prompt:
>i want to have a drag and drop list, where dropping triggers and update to the server
- Response:
    -  Using stimulus in combination with sortablejs
    
    